import bcrypt from "bcrypt";
import {User} from "../models/User";


export const createUser = async (email: string, password: string)=>{
    const hasUser = await User.findOne({where: { email }}); //procurar email
    if(!hasUser){ //se o email não existir
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            email: email,
            password: hash
        });
        return newUser
    } else {
        return new Error("E-mail já existente"); //se o email já existir
    };
};

export const findByEmail = async (email: string)=>{
    return await User.findOne({where: {email}});
};

export const matchPassword = async (passwordText: string, encripted: string)=>{
    return bcrypt.compareSync(passwordText, encripted);
};

export const all = async ()=>{
    return await User.findAll();
};