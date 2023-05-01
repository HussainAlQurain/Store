import { Router, Response, Request } from "express";
import { User, UserStore } from "../models/user";
import jwt from 'jsonwebtoken'

const store = new UserStore();

export class UserHandler {
    async index(_req: Request, res: Response) {
        try{
            const users = await store.indexUsers();
            res.status(200).json(users);
        }
        catch (err){
            res.status(400).json(err);
        }
    }
    async show(req: Request, res: Response) {
        try{
            const user = await store.showUser(parseInt(req.params.id));
            if(user){
                res.status(200).json(user);
            } else{
                res.status(404).json('User not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async create(req: Request, res: Response) {
        try{
            if(!req.body.password_digest || !req.body.username){
                res.status(400).json('Please Provide a username and password');
            }
            else{
            const user = await store.createUser(req.body);
            let token = jwt.sign({ id: user.id, username: user.username}, process.env.TOKEN_SECRET as string);
            res.status(201).json(token);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req: Request, res: Response){
        try{
            const user = await store.editUser({id: parseInt(req.params.id), first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password_digest: req.body.password, email: req.body.email});
            res.status(201).json(user);

        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async destroy(req: Request, res:Response) {
        try{
            const user = await store.deleteUser(parseInt(req.params.id));
            res.status(200).json({status: `Deleted ${user}`});
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async authenticate(req: Request, res: Response) {
        try{
            const user = await store.authenticate(req.body.username, req.body.password_digest);
            if(user){
            let token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
            res.status(201).json(token);
            }
            else{
                res.status(400).json('No user found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}