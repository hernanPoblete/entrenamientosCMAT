import mongoose, { Schema, model } from "mongoose";
import * as bcrypt from 'bcrypt';
let cursos = require("./cursos");


const userSchema = new Schema({
    nombre:{
        type: String,
        required:false,
        unique:false
    },
    rut:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    acceso:{
        type:Number,
        requied:true,
        unique:false,
        default:3
    },
    cursos: [String]
});



userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 15);
    next();
});

userSchema.methods.validateUser = async function(password: string){
    return (await bcrypt.compare(password, this.password));
}

userSchema.methods.encontrarCursos = async function (){

    let q = await cursos.find({
        codigo: {
            $in:this.cursos
        }
    }, 'nombre codigo');

    return q

}


module.exports = model('user', userSchema);