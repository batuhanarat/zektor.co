import { Request, Response } from "express";
import UserModel from "../models/User";

export async function createUserController(req: Request, res: Response) {

    try {
        const newUser = new UserModel({
            plants:  []
        });

        const savedUser = await newUser.save();

        //res.status(201).json(savedUser);
        return res.send(savedUser._id);
    } catch (error) {
        if (error instanceof Error && error.message) {
            res.status(500).json({ message: "Failed to create user", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to create user", error: "Unknown error occurred" });
        }
    }
}
