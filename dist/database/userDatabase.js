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
exports.saveUser = exports.getPasswordUserByEmail = exports.getEmailUserByEmail = exports.getUsersByLevel = exports.getUserByEmail = exports.getUserById = exports.getUserFiltered = exports.getAllUsers = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../model/user");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield typeorm_1.getRepository(user_1.Users).query(`SELECT * FROM Users`);
    console.log(allUsers);
    return allUsers;
});
exports.getAllUsers = getAllUsers;
const getUserFiltered = (email, level, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const usersFiltered = yield typeorm_1.getRepository(user_1.Users).query(`EXEC GetFilteredUser @emailUser = @0,@levelUser = @1,@rol = @2`, [email,
        level,
        rol]);
    console.log(usersFiltered);
    return usersFiltered;
});
exports.getUserFiltered = getUserFiltered;
const getUserById = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_1.Users).query(`SELECT * FROM Users WHERE idUser = @0`, [idUser]);
    return user[0];
});
exports.getUserById = getUserById;
const getUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_1.Users).query(`SELECT * FROM Users WHERE emailUser = @0`, [emailUser]);
    return user[0];
});
exports.getUserByEmail = getUserByEmail;
const getUsersByLevel = (idLevel) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(user_1.Users).query(`SELECT * FROM Users WHERE level = @0`, [idLevel]);
    return user;
});
exports.getUsersByLevel = getUsersByLevel;
const getEmailUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield typeorm_1.getRepository(user_1.Users).query(`SELECT emailUser FROM Users WHERE emailUser = @0`, [emailUser]);
        return user[0].emailUser;
    }
    catch (error) {
        return "";
    }
});
exports.getEmailUserByEmail = getEmailUserByEmail;
const getPasswordUserByEmail = (emailUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield typeorm_1.getRepository(user_1.Users).query(`SELECT passwordUser FROM Users WHERE emailUser = @0`, [emailUser]);
        return user[0].passwordUser;
    }
    catch (error) {
        return "";
    }
});
exports.getPasswordUserByEmail = getPasswordUserByEmail;
const saveUser = (user, passwordEncripted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield typeorm_1.getRepository(user_1.Users).query(`INSERT INTO Users(emailUser, passwordUser) VALUES(@0, @1)`, [user.emailUser, passwordEncripted]);
        return "saved";
    }
    catch (error) {
        return "no saved";
    }
});
exports.saveUser = saveUser;
