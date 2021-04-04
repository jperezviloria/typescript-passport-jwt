import {Router} from "express"
import {getAllUsersController, getAllUsersByLevelController, getUsersFiltered} from "../controller/userController"

const router = Router();


router.route("/")
.get(getAllUsersController)

router.route("/level/:id")
.get(getAllUsersByLevelController)

router.route("/filter")
.post(getUsersFiltered)


export default router;