import {Router} from 'express';
import passport from 'passport';
import { sign } from "jsonwebtoken";
let cursos = require("../models/cursos");


let router = Router();

router.post('/', async (req, res,next)=>{
    passport.authenticate("login", async (err:any, user:any, info:any)=>{
        try {

            if(err||!user){
                throw new Error(info? info!.message:"Ha ocurrido un error inesperado")
            }

            req.login(user, {session:false}, async (err)=>{
                if (err) return next(err)
                const {password,__v, ...body} = user["_doc"];
                body.cursos = body.acceso === 0? await cursos.find({}, "nombre codigo"): await user.encontrarCursos();
            
                const token = sign({user: body}, process.env.SECRET_KEY||"trespuntounocuatrounocinconuevedosseiscinco")
                return res.redirect(`perfil?secret_token=${token}`);
            
            });


        } catch (error) {
            res.render("login.ejs", {
                message: error
            })
        }
    })(req, res, next);
});


module.exports = router