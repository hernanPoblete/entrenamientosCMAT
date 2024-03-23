import mongoose, {model, Schema, Types} from "mongoose";




let Mensaje = new Schema({
    creador: {
        type:Types.ObjectId,
        required: true
    },
    curso: {
        type:String,
        required:true
    },
    hijos: Types.ObjectId,
    esAncestroMayor:{
        type:Boolean,
        default:false,
        required: true
    },
    contenido:{
        type:String,
        required: true
    },
    titulo: String
})



let Model = model('foro', Mensaje, 'foro');


module.exports = Model