import {Router} from 'express';

let router = Router();

router.get("/", (req, res)=>{
    console.log(req.cookies);
    req.cookies.session?res.redirect("perfil"):res.render("login.ejs");
})

module.exports = router