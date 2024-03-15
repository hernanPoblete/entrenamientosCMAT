import {Router} from 'express';

let router = Router();

router.get("/", (req, res)=>{
    res.render("login.ejs");
})

module.exports = router