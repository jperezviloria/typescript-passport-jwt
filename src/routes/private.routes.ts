import {Router} from "express"
import {getAllUsersController} from "../controller/userController"

const router = Router();

import passport from "passport";


router.get("/",passport.authenticate('jwt',{session:false}) ,getAllUsersController)



export default router;