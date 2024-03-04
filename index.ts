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
                const body = {
                    __id:user.__id,
                    nombre: user.nombre,
                    rut:user.rut,
                    acceso:user.acceso,
                    cursos: user.cursos
                }

                const token = sign({user:body}, process.env.SECRET_KEY||"trespuntounocuatrounocinconuevedosseiscinco")
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
        acceso?:number
    }

    res.render('dashboard.ejs', {userinfo: req.user})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))