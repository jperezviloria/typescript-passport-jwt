import {Request, Response} from "express"
import {Users, IUser} from "../model/user"
import {getUserByEmail, getAllUsers} from "../database/userDatabase"
import {getRepository} from "typeorm"


export const getAllUsersController = async(req: Request, res: Response): Promise<Response> =>{
    const allUsers = await getAllUsers()
    return res.json({
        "status": 200,
        "data": allUsers
    })
}

