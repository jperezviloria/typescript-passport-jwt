import {Router} from "express"
import {getAllUsersController} from "../controller/userController"

const router = Router();


router.route("/")
.get(getAllUsersController)




export default router;