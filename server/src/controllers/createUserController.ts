import { Request, Response } from "express";
import UserModel from "../models/User";

export async function createUserController(req: Request, res: Response) {
    const { device_id } = req.body;

    if ( !device_id) {
        return res.status(400).json({ message: "device_id is required" });
    }

    try {
        const newUser = new UserModel({
            device_id,
            plants:  []
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        if (error instanceof Error && error.message) {
            res.status(500).json({ message: "Failed to create user", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to create user", error: "Unknown error occurred" });
        }
    }
}
