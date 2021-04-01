"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = express_1.Router();
router.route("/")
    .get(userController_1.getAllUsersController);
exports.default = router;
