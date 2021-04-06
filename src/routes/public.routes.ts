import {Router} from "express"
import {getAllUsersController, getAllUsersByLevelController, getUsersFiltered, saveImage} from "../controller/userController"

const router = Router();


router.route("/")
.get(getAllUsersController)

router.route("/level/:id")
.get(getAllUsersByLevelController)

router.route("/filter")
.post(getUsersFiltered)

router.route("/images/add")
.post(saveImage)


export default router;