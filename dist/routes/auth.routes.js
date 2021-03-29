"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authUserController_1 = require("../controller/authUserController");
const router = express_1.Router();
router.route("/signup")
    .post(authUserController_1.signUp);
router.route("/signin")
    .post(authUserController_1.signIn);
exports.default = router;
