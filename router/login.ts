import {Router} from 'express';
import passport from 'passport';
import { sign } from "jsonwebtoken";
let cursos = require("../models/cursos");
import "../auth"

let router = Router();

router.post('/login', async (req, res,next)=>{
    passport.authenticate("login", async (err:any, user:any, info:any)=>{
        try {
            if(err||!user){
                throw new Error(info? info!.message:"Ha ocurrido un error inesperado")
            }

            req.login(user, {session:false}, async (err)=>{
                if (err) return next(err)
                const {password,__v, ...body} = user["_doc"];
                body.cursos = body.acceso === 0? await cursos.find({}, "nombre codigo"): await user.encontrarCursos();
            
                const token = sign({user: body}, process.env.SECRET_KEY||"trespuntounocuatrounocinconuevedosseiscinco");
                res.cookie("session", token);

                return res.redirect(`/perfil`);

            
            });


        } catch (error) {
            res.render("login.ejs", {
                message: error
            })
        }
    })(req, res, next);
});



router.post("/out", async (req, res)=>{
    req.user = undefined
    res.clearCookie("session");
    res.redirect("/");   
})

module.exports = router
