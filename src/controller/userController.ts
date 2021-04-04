import {Request, Response} from "express"
import {Users, IUser} from "../model/user"
import {getUserByEmail, getAllUsers, getUsersByLevel, getUserFiltered} from "../database/userDatabase"
import {getRepository} from "typeorm"


export const getAllUsersController = async(req: Request, res: Response): Promise<Response> =>{
    const allUsers = await getAllUsers()
    return res.json({
        "status": 200,
        "data": allUsers
    })
}

export const getAllUsersByLevelController = async(req: Request, res: Response): Promise<Response> =>{
    const levelID: any = req.params.id
    const usersByLevel = await getUsersByLevel(parseInt(levelID))
    return res.json({
        "status": 200,
        "data": usersByLevel
    })
}

export const getUsersFiltered = async(req: Request, res: Response): Promise<Response> =>{
   
    const usersFiltered = await getUserFiltered(req.body.emailUser, req.body.level,req.body.rol)
    return res.json({
        "status": 200,
        "data": usersFiltered
    })
}

