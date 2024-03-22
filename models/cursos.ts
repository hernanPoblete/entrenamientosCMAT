import mongoose, { Schema, model, Types } from "mongoose";
import * as bcrypt from 'bcrypt';
let user = require("./users");

//let con = mongoose.connect("mongodb://127.0.0.1:27017/entrenamientoCMAT");

const Curso = new Schema({
    codigo: {
        type: String,
        required:true,
        unique: true
    },
    nombre: String,
    integrantes: [String]
})


//En caso de que alguien tenga un codigo de curso que está recién siendo añadido
Curso.pre("save", async function(next){
    let u = await user.find({cursos:{$in: [this.codigo] }});
    u=u.map((u:{id:string})=>{
        return new mongoose.Types.ObjectId(u.id)
    });
    this.integrantes = u;

    next();
})


module.exports = model('curso', Curso, 'cursos');