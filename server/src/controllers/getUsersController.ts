import {Request,Response} from "express";
import User from "../models/User";

export async function getUsersController(req:Request, res: Response) {

    const users = await User.find();
    return res.json(users);
}