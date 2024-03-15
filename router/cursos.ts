import {Router} from 'express';
import passport from "passport";
import "../auth";
let cursos = require("../models/cursos");

let router = Router();

router.get("/", passport.authenticate("cursos", {session:false}), async (req, res, next)=>{

    res.render("interfaz_curso.ejs", {userinfo: req.user, data: await cursos.findOne(req.params)})
})


module.exports = router