import { Schema, model } from "mongoose";
import * as bcrypt from 'bcrypt';

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

module.exports = model('user', userSchema);