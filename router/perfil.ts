import {Router} from 'express';
import passport from "passport";
import "../auth";

let router = Router();

router.get("/", passport.authenticate("jwt", {session:false}), async (req, res, next)=>{
    interface U extends Express.User {
        nombre? : string,
        rut?: string,
        acceso?:number,
        cursos?: Object[],
        token?:any
    }

    let user:U = req.user!;
    


    res.render('dashboard.ejs', {userinfo: user, token:req.query.secret_token})
})


module.exports = router