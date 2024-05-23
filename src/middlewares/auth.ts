import {Request, Response, NextFunction} from "express";
import {User} from "../models/User";
import JWT from "jsonwebtoken"; //esse 
import dotenv from "dotenv"; //e esse

dotenv.config(); //sempre lembrar de rodar o dotenv

export const Auth = {
    basic: async (req: Request, res: Response, next: NextFunction)=>{

        let success = false;

        //Verificação de auth
        if(req.headers.authorization){
            let hash: string = req.headers.authorization.substring(6);
            let decoded: string = Buffer.from(hash, 'base64').toString();
            let data: string[] = decoded.split(':');

            if(data.length === 2){
                let hasUser = await User.findOne({
                    where :{
                        email: data[0],
                        password: data[1]
                    }
                })

                if(hasUser){
                    success = true;
                }
            };       
        }

        if(success){
            next();

        } else {
            res.status(403); //Not authorized
            res.json({error: 'Não autorizado'});
        }
    },


    jwt: async (req: Request, res: Response, next: NextFunction)=>{

        let success = false;

        //Verificação de auth
        if(req.headers.authorization){
          const [authType, token] = req.headers.authorization.split(' ');
          if(authType === "Bearer"){
                try{
                    JWT.verify(token, process.env.JWT_KEY as string);
                    success = true;
                } catch(err){

                }
          }
        }
        if(success){
            next();

        } else {
            res.status(403); //Not authorized
            res.json({error: 'Não autorizado'});
        }
    }
};