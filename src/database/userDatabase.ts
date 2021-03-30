import {getRepository} from "typeorm"
import {Users, IUser} from "../model/user"


export const getAllUsers = async (): Promise<Response> =>{

    const allUsers = await getRepository(Users).query(`SELECT * FROM Users`)
    console.log(allUsers)
    return allUsers
}

export const getUserById = async(idUser: string):Promise<Response> =>{
    const user = await getRepository(Users).query(`SELECT * FROM Users WHERE idUser = @0`, [idUser])
    return user[0]
}

export const getUserByEmail = async(emailUser: string):Promise<IUser> =>{
    const user = await getRepository(Users).query(`SELECT * FROM Users WHERE emailUser = @0`, [emailUser])
    return user[0]
}

export const getEmailUserByEmail = async(emailUser: string) =>{
    try{
        const user = await getRepository(Users).query(`SELECT emailUser FROM Users WHERE emailUser = @0`, [emailUser])
        return user[0].emailUser
    }catch(error){
       return "" 
    }
}
export const getPasswordUserByEmail = async(emailUser: string)=>{
    try{
        const user = await getRepository(Users).query(`SELECT passwordUser FROM Users WHERE emailUser = @0`, [emailUser])
    return user[0].passwordUser
    }catch(error){
        return ""
    }
}

export const saveUser = async(user: IUser, passwordEncripted:any) =>{
    try{
        const newUser = await getRepository(Users).query(`INSERT INTO Users(emailUser, passwordUser) VALUES(@0, @1)`, [user.emailUser, passwordEncripted])
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}