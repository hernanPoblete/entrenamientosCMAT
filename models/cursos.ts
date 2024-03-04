import { Schema, model } from "mongoose";
import * as bcrypt from 'bcrypt';
const User = require("./users");


const Curso = new Schema({
    codigo: {
        type: String,
        required:true,
        unique: true
    },
    nombre: String,
    integrantes: [User]
})