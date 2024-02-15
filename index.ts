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

mongoose.connect(process.env.MONGO_CONNECTION||"mongodb://127.0.0.1:27017/entrenamientoCMAT");

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="login" method="post">
            <input type="text" name="rut" id=""><br><input type="password" name="password" id=""><br><input type="submit" value="">
        </form>
    </body>
    </html>
    `)
})

app.post('/login', async (req, res,next)=>{
    passport.authenticate("login", async (err:any, user:any, info:any)=>{
        try {
            if(err||!user){
                const e = new Error("New Error");
                console.error(err);
                return next(e);
            }

            req.login(user, {session:false}, async (err)=>{
                if (err) return next(err)
                const body = {
                    __id:user.__id,
                    nombre: user.nombre,
                    rut:user.rut,
                    acceso:user.acceso
                }

                const token = sign({user:body}, process.env.SECRET_KEY||"trespuntounocuatrounocinconuevedosseiscinco")
                return res.redirect(`perfil?secret_token=${token}`);
            
            });


        } catch (error) {
            next(error)
        }
    })(req, res, next);
});

app.get("/perfil", passport.authenticate("jwt", {session:false}), async (req, res, next)=>{
    interface U extends Express.User {
        nombre? : string,
        rut?: string,
        acceso?:number
    }

    let accesos: string[]= ["Admin", "Profesor", "Estudiante"];

    let u: U | undefined= req.user
    let a = u === undefined?2:(u.acceso === undefined ? 2:u.acceso)
    res.send(`<h1>Bienvenid@ ${u?.nombre}. Tu nivel de acceso es ${accesos[a]}</h1>`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))