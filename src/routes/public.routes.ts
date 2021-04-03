import {Router} from "express"
import {getAllUsersController, getAllUsersByLevelController} from "../controller/userController"

const router = Router();


router.route("/")
.get(getAllUsersController)

router.route("/level/:id")
.get(getAllUsersByLevelController)




export default router;