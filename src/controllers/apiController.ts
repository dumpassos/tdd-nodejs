import { Request, Response } from 'express';
import * as UserService from "../services/UserServices";
import { User } from '../models/User';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {

    if(req.body.email && req.body.password) {

        //Verifica os campos
        let email: string = req.body.email;
        let password: string = req.body.password;

        //roda o service
       const newUser = await UserService.createUser(email, password);

       //retorno
       if(newUser instanceof Error){ //se deu errado
        return res.json({ error: newUser.message});
       } else { // se deu certo
            res.status(201);
            return res.json({ id: newUser.id });
       }
    } else {
    res.json({ error: 'E-mail e/ou senha não enviados.' }); //se não preencheu os campos corretamente
    }
};

export const login = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {

        //verifica os campos
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await UserService.findByEmail(email); //pega o email

    if(user && await UserService.matchPassword(password, user.password)){ //se email e senha baterem
        res.json({ status: true }); 
        return;
    } else {
        res.json({ status: false });
    }
    } else {
        res.json({ error: 'E-mail e/ou senha não enviados.' });
    }
};

export const list = async (req: Request, res: Response) => {
    let users = await UserService.all()
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].email );
    }

    res.json({ list });
};