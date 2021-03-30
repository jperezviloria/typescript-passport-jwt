import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt"
import config from "../config/config"
import {IUser} from "../model/user"
import { getUserById } from "../database/userDatabase";


const opts: StrategyOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async(payload, done) =>{
    try {
        const user = await getUserById(payload.id)
        console.log("aqui")
        console.log(payload)
        console.log(payload.id)
        console.log(payload.email)
        console.log(user)
        if(user){
            return  done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
})