import * as passport from 'passport';
import { Strategy } from 'passport-local';
const User = require("./models/users.js");

const login_config:object={
    usernameField:'rut',
    passwordField: 'password',
    session:true
}

passport.use('login', new Strategy(login_config, async(rut, password, done)=>{
    try {
        let user = await User.findOne({rut});
        if(!user){return done(null, false, {message: "Usuario no encontrado."})} 
        if(!user.validate()){return done(null, false, {message: "Contraseña incorrecta para el usuario seleccionado."})} 
        return done(null, user, {message: "Login exitoso"});
    
    } catch (error) {
        return done(error);
    }
}))