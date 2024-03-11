import express, { Router, json, urlencoded } from 'express'
import * as path from 'path';
import * as mongoose from 'mongoose';
import passport from 'passport';
import { sign } from "jsonwebtoken";
import './auth'

import * as dotenv from 'dotenv';

dotenv.config({
    'path': path.join(process.cwd(), '.env')
});

let cursos = require("./models/cursos");


const app = express()
const port: number = parseInt(process.env.PORT||'3030');

app.use(urlencoded({extended:true}));
app.use(json());
app.use(express.static('public'));

app.set("view-engine", "ejs");
app.set("views", "./views");


mongoose.connect(process.env.MONGO_CONNECTION||"mongodb://127.0.0.1:27017/entrenamientoCMAT");

app.get('/', (req, res) => {
    res.render("login.ejs")
})

app.post('/login', async (req, res,next)=>{
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



app.get("/perfil", passport.authenticate("jwt", {session:false}), async (req, res, next)=>{
    interface U extends Express.User {
        nombre? : string,
        rut?: string,
        acceso?:number,
        cursos?: Object[],
        token?:any
    }

    let user:U = req.user!;
    


    res.render('dashboard.ejs', {userinfo: user, token:req.query.secret_token})
})


app.get("/cursos/:codigo", passport.authenticate("cursos", {session:false}), async (req, res, next)=>{

    res.render("interfaz_curso.ejs", {userinfo: req.user, token: req.query.secret_token, data: await cursos.findOne(req.params)})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))