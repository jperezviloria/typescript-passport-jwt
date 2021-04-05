import {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import config from "../config/config";
import {Users, IUser} from "../model/user"
import {getUserByEmail, saveUser, getEmailUserByEmail, getPasswordUserByEmail} from "../database/userDatabase"

const MESSAGE_SEND_COMPLETE_INFO: string = "Please. Send email, password, level and rol"
const MESSAGE_USER_EXIST: string = "The User already exist"
const MESSAGE_USER_DONT_EXIST: string = "The User doesn`t exist"
const MESSAGE_USER_SAVED: string = "The User was saved successfully"
const MESSAGE_CREATED_TOKEN: string = "Token created"
const MESSAGE_EMAIL_OR_PASSWORD_WRONG: string = "The Email or Password are wrong"



export const createToken = (user: IUser) =>{
    return jwt.sign({
        id: user.idUser,
        email: user.emailUser
    },
    config.jwtSecret, {
        expiresIn: 86400
    })
}

export const signUp = async(req: Request, res: Response):Promise<Response> =>{
    
    var user: IUser = {
        emailUser: req.body.emailUser,
        passwordUser: req.body.passwordUser,
        levelUser: req.body.levelUser,
        rolUser: req.body.rolUser, 
    }
    
    if(!user.emailUser || !user.passwordUser || !user.levelUser || !user.rolUser){
        return res.json({
            "status":400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        })
    }
    const existConsult = await existUserByEmail(res, user.emailUser)
    if(existConsult){
        return res.json({
            "status":400,
            "message":MESSAGE_USER_EXIST
        })    
    }

    await saveNewUser(res, user);
    return res.json({
        "status":201,
        "data":user,
        "message":MESSAGE_USER_SAVED
    })

    
}

export const signIn = async (req: Request, res: Response) =>{
    var user: IUser = {
        emailUser: req.body.emailUser,
        passwordUser: req.body.passwordUser 
    }

    if(!user.emailUser || !user.passwordUser){
        return res.json({
            "status":400,
            "message": MESSAGE_SEND_COMPLETE_INFO
        })
    }
    const existConsult = await existUserByEmail(res, user.emailUser)
    console.log(existConsult)
    if (!existConsult){
        return res.json({
            "status":400,
            "message":MESSAGE_USER_DONT_EXIST
        }) 
    }
    const passwordUserByEmail = await getPasswordUserByEmail(user.emailUser)
    console.log(JSON.stringify(passwordUserByEmail))
    console.log(JSON.stringify(user.passwordUser))

    
    const isMatch = await comparePassword(user.passwordUser, passwordUserByEmail)
    const userToAuthenticate = await getUserByEmail(user.emailUser);
    console.log(isMatch)
    if(isMatch){
        return res.json({
            "status":200,
            "message":MESSAGE_CREATED_TOKEN,
            "token": createToken(userToAuthenticate),
            "user":userToAuthenticate
        })  
    }

    return res.json({
        "status":400,
        "message":MESSAGE_EMAIL_OR_PASSWORD_WRONG
    }) 

}

export const saveNewUser = async(res: Response, user:IUser)=>{
    try{
        const passwordEncripted = await encryptPassword(user)
        await saveUser(user, passwordEncripted)
    }catch(error){
        return res.json({
            "status":400,
            "message": MESSAGE_USER_EXIST
        })
    }
} 

const existUserByEmail = async(res: Response, externalEmail: string) =>{

    var emailFound = await getEmailUserByEmail(externalEmail);
    console.log(emailFound)
    console.log(JSON.stringify(emailFound))
    console.log(externalEmail)
    if(JSON.stringify(emailFound) == JSON.stringify(externalEmail)){
        return true
    }
    else{
        return false
    }
}

const encryptPassword = async(user:IUser) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.passwordUser, salt);
    console.log(hash)
    return hash;
}

const comparePassword = async(externalPassword: string, passwordFound: any): Promise<boolean> =>{
    const comparingPassword = await bcrypt.compare(externalPassword, passwordFound)
    console.log("aqui")
    console.log(comparingPassword)
    return comparingPassword;
}

