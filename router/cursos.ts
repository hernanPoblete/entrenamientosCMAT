import {Router} from 'express';
import passport from "passport";
import "../auth";
let cursos = require("../models/cursos");
let foro = require("../models/foro")
import { Types } from 'mongoose';



let router = Router();

router.get("*", passport.authenticate("cursos", {session:false}), async (req, res, next)=>{

    next()
})

router.get("/", async (req, res, next)=>{
    res.render("interfaz_curso.ejs", {userinfo: req.user, data: await cursos.findOne(req.params)})
})

router.get("/foro/:id", async (req, res, next)=>{
    let {id} = req.params;
    let d = await foro.aggregate([
        {$match:{
            _id: new Types.ObjectId(id)
        }},

        {$graphLookup:{ 
            from: "foro", 
            connectFromField: "hijos", 
            connectToField: "_id", 
            as: "hijosExpandidos" , 
            startWith:"$hijos"
        }}
    ])

    interface Tree{
        contenido: String,
        hijosExpandidos?: Tree[]
    }

    let build = (tree:Tree)=>{
        let f = `<div class = "messageContainer"> <div class = "messageContent">${tree.contenido}</div>`;
        if(tree.hijosExpandidos){
            tree.hijosExpandidos.forEach((branch:Tree)=>{
                f = f.concat(build(branch))
            })            
        }
        f = f.concat("</div>")
        return f
    }
    res.render("foro.ejs", {user: req.user, data: d[0], build: build})
})

module.exports = router