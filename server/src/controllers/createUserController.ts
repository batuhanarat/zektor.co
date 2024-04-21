import { Request, Response } from "express";
import UserModel from "../models/User";

export async function createUserController(req: Request, res: Response) {
    const { user_id, device_id, plants } = req.body;

    if (!user_id || !device_id) {
        return res.status(400).json({ message: "user_id and device_id are required" });
    }

    // Optionally, validate that plants, if provided, is an array of valid MongoDB ObjectIds
    if (plants && !Array.isArray(plants)) {
        return res.status(400).json({ message: "plants must be an array of ObjectIds" });
    }

    try {
        const newUser = new UserModel({
            user_id,
            device_id,
            plants: plants || []
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
}
