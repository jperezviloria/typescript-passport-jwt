"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
router.get("/", passport_1.default.authenticate('jwt', { session: false }), userController_1.getAllUsersController);
exports.default = router;
