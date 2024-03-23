import {Router} from 'express';
import passport from "passport";
import "../auth";
let cursos = require("../models/cursos");
let foro = require("../models/foro")
import { Types } from 'mongoose';

interface EnsuredData{
    codigo?:string
}

let router = Router({mergeParams: true});

router.get("*", passport.authenticate("cursos", {session:false}), async (req, res, next)=>{
    next()
})

router.get("/", async (req, res, next)=>{
    res.render("interfaz_curso.ejs", {userinfo: req.user, data: await cursos.findOne(req.params)})
})


router.get("/foro", async (req, res, next)=>{
    let p: EnsuredData = req.params;
    let f = await foro.find({curso:p.codigo, esAncestroMayor: true}, "titulo id")
    res.render("foromaster.ejs", {posts: f});
});



interface Tree{
    creador: Types.ObjectId,
    titulo: String,
    contenido: String,
    curso: String,
    hijos: Types.ObjectId[],
    esAncestroMayor: Boolean
}
interface ExtendedTree extends Tree{
    hijosExtendidos: ExtendedTree[]
}

let treeExtender = async (eldest: Tree): Promise<ExtendedTree>=>{
    let hijosExtendidos:ExtendedTree[] = []
    let f = await foro.find({_id: {$in:eldest.hijos}})

    for (let i = 0; i<f.length; i++){
        let d = await treeExtender(f[i].toObject());
        hijosExtendidos.push(d)
    }

    return {...eldest, hijosExtendidos: hijosExtendidos}

}

let build = (tree:ExtendedTree)=>{
    let f = `<div class = "messageContainer"> <div class = "messageContent">${tree.contenido}</div>`;
    if(tree.hijosExtendidos){
        tree.hijosExtendidos.forEach((branch:ExtendedTree)=>{
            f = f.concat(build(branch))
        })            
    }
    f = f.concat("</div>")
    return f
}

router.get("/foro/:id", async (req, res, next)=>{
    let {id} = req.params;
    let d = (await foro.find({esAncestroMayor:true, _id: id}))[0];
    res.render("foro.ejs", {user: req.user, data: await treeExtender(d.toObject()), build: build})
})

module.exports = router