import request from "supertest";
import app from "../app";
import {User, UserInstance} from "../models/User"; //model
import { response } from "express";

describe('Testing api routes', ()=>{

    let email = "teste@teste.com";
    let password = 12345;

    beforeAll(async ()=>{
        await User.sync({force: true}) //sincronizando com o banco de dados
    }); 

    it('Should  ping pong', (done)=>{
        request(app) 
        .get('/ping') 
        .then(response => { 
            expect(response.body.pong).toBeTruthy() 
            return done();
        })
    });

    it('Should  register a new user', (done)=>{
        request(app) 
        .post('/register')
        .send(`email=${email}&password=${password}`) //url-encoded
        .then(response => { 
            expect(response.body.error).toBeUndefined();
            expect(response.body).toHaveProperty('id');
            return done();
        })
    });

    it('Should not allowd register a new user with existing email', (done)=>{
        request(app) 
        .post('/register')
        .send(`email=${email}&password=${password}`) //url-encoded
        .then(response => { 
            expect(response.body.error).not.toBeUndefined();
            return done();
        })
    });

    it('Should not allowd register a new user without password', (done)=>{
        //registrando sem password
        request(app) 
        .post('/register')
        .send(`email=${email}`) //url-encoded
        .then(response => { 
            expect(response.body.error).not.toBeUndefined();
            return done();
        })
    });

    it('Should not allowd register a new user without any data', (done)=>{
        //registrando sem email
        request(app) 
        .post('/register')
        .send(``) //url-encoded
        .then(response => { 
            expect(response.body.error).not.toBeUndefined();
            return done();
        })
    });

    it('Should login correctly', (done)=>{
        request(app) 
        .post('/login')
        .send(`email=${email}&password=${password}`) //url-encoded
        .then(response => { 
            expect(response.body.error).toBeUndefined();
            expect(response.body.status).toBeTruthy();
            return done();
        })
    });

    it('Should not login with incorrect data', (done)=>{
        request(app) 
        .post('/login')
        .send(`email=${email}&password=SenhaErrada`) //url-encoded
        .then(response => { 
            expect(response.body.error).toBeUndefined();
            expect(response.body.status).toBeFalsy();
            return done();
        })
    });

    it('Should list users', (done)=>{
        request(app) 
        .get('/list')
        .then(response => { 
            expect(response.body.error).toBeUndefined();
            expect(response.body.list.length).toBeGreaterThanOrEqual(1);
            expect(response.body.list).toContain(email);
            return done();
        })
    });
});