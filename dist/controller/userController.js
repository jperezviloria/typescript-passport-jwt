"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersFiltered = exports.getAllUsersByLevelController = exports.getAllUsersController = void 0;
const userDatabase_1 = require("../database/userDatabase");
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield userDatabase_1.getAllUsers();
    return res.json({
        "status": 200,
        "data": allUsers
    });
});
exports.getAllUsersController = getAllUsersController;
const getAllUsersByLevelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const levelID = req.params.id;
    const usersByLevel = yield userDatabase_1.getUsersByLevel(parseInt(levelID));
    return res.json({
        "status": 200,
        "data": usersByLevel
    });
});
exports.getAllUsersByLevelController = getAllUsersByLevelController;
const getUsersFiltered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = {
        emailUser: req.body.emailUser,
        levelUser: req.body.levelUser,
        rolUser: req.body.rolUser,
    };
    // const email = req.body.emailUser;
    // const level = req.body.levelUser;
    // const rol = req.body.rolUser;
    console.log(users.emailUser);
    console.log(users.levelUser);
    console.log(users.rolUser);
    const usersFiltered = yield userDatabase_1.getUserFiltered(users.emailUser, users.levelUser, users.rolUser);
    return res.json({
        "status": 200,
        "data": usersFiltered
    });
});
exports.getUsersFiltered = getUsersFiltered;
