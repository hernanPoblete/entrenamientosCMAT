import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import {Strategy as jwtStrategy, ExtractJwt} from 'passport-jwt'
const User = require("./models/users");
import * as path from "path";



import * as dotenv from 'dotenv';
dotenv.config({
    'path': path.join(process.cwd(), '.env')
});

const login_config:object={
    usernameField:'rut',
    passwordField: 'password',
    session:true
}

passport.use('login', new localStrategy(login_config, async(rut, password, done)=>{
    try {
        if(!rut||!password) return done(null, false, {message: "Falta usuario o contraseña"})
        let user = await User.findOne({rut: rut});
        if(!user){return done(null, false, {message: "Usuario no encontrado."})} 
        if(!(await user.validateUser(password))){return done(null, false, {message: "Contraseña incorrecta para el usuario seleccionado."})} 
        return done(null, user, {message: "Login exitoso"});
    
    } catch (error) {
        return done(error);
    }
}))


passport.use('jwt', new jwtStrategy({
    secretOrKey: process.env.SECRET_KEY||"trespuntounocuatrounocinconuevedosseiscinco",
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
}, async (token, done)=>{
    try {
        return done(null, token.user)
    } catch (error) {
        return done(error)
    }
}))