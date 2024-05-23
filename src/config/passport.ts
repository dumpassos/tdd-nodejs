import passport from "passport";
import dotenv from "dotenv";
import {Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";
import {User} from "../models/User"; 
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const notAuthorizedJson = { status: 401, message: "Não autorizado" };
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //onde procurar o token
    secretOrKey: process.env.JWT_KEY as string //chave de 'descriptografia'
};

passport.use(new JWTStrategy(options, async (payload, done)=>{
    const user = await User.findByPk(payload.id);
    if(user){
        return done(null, user);
    } else{
        return done(notAuthorizedJson, false);
    }

}));

export const generateToken = (data: object)=>{
    return jwt.sign(data, process.env.JWT_KEY as string)
};


export const jwtAuth = (req: Request, res: Response, next: NextFunction)=>{
        const authFunction = passport.authenticate('jwt', (err: any, user: any)=>{
            req.user = user;
            if(user){
                next();
            }else {
                next(notAuthorizedJson);
            }
        });
        authFunction(req, res, next);
};

export default passport; 