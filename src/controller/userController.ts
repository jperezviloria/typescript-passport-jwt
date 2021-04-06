import {Request, Response} from "express"
import {Users, IUser, IUserFilter} from "../model/user"
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

export const getUsersFiltered = async(req: Request, res: Response) =>{

    const users: IUserFilter = {
        emailUser: req.body.emailUser,
        levelUser: req.body.levelUser,
        rolUser: req.body.rolUser,
    }
    // const email = req.body.emailUser;
    // const level = req.body.levelUser;
    // const rol = req.body.rolUser;
    console.log(users.emailUser)
    console.log(users.levelUser)
    console.log(users.rolUser)
    const usersFiltered = await getUserFiltered(users.emailUser, users.levelUser, users.rolUser)
    return res.json({
        "status": 200,
        "data": usersFiltered
    })
}

export const saveImage = async(req: Request, res: Response) =>{
    console.log(req.body);
    
}

