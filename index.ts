import express, { Router, json, urlencoded } from 'express'
import * as path from 'path';
import * as mongoose from 'mongoose';
import passport from 'passport';
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

app.use("/", require("./router/index"));
app.use("/login", require("./router/login"));
app.use("/perfil", require("./router/perfil"))
app.use("/cursos/:codigo", require("./router/cursos"));





app.listen(port, () => console.log(`Example app listening on port ${port}!`))