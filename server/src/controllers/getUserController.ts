import {Request,Response} from "express";
import User from "../models/User";

export async function getUserController(req:Request, res: Response) {

    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user) return;
    return res.json(user);
}