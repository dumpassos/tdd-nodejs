import {User, UserInstance} from "../models/User"; //model
import * as UserService from "./UserServices"; //service

describe('Testing user service', ()=>{

    let email = "teste@teste.com";
    let password = "1234"; 

    beforeAll(async ()=>{
        await User.sync({force: true})
    });

    it('should create a new user', async()=>{
        const newUser = await UserService.createUser(email, password) as UserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(email);
    });

    it('shoud not allow to create a user with existing email', async ()=>{
        const newUser = await UserService.createUser(email, password);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('should find a user by email', async()=>{
        const user = await UserService.findByEmail(email) as UserInstance;
        expect(user.email).toBe(email);
    });

    it('should match the password from database', async()=>{
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = await UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy(); //ou pode ser expect(match).toBe(true)
    });

    it('should not match the password from database', async()=>{
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = await UserService.matchPassword("SenhaInvalida", user.password);
        expect(match).toBeFalsy(); //ou pode ser expect(match).toBe(false)
    });

    it('should get a list of users', async()=>{
        const users = await UserService.all();
        expect(users.length).toBeGreaterThanOrEqual(1);
        for(let i in users){
            expect(users[i]).toBeInstanceOf(User);
        }
     });

});