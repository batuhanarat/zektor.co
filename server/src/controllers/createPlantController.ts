import {Request,Response} from "express";
import Plant from "../models/Plant";
import User from "../models/User";

export async function createPlantController(req:Request, res: Response) {
    const { userId, type } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
    }

     try {
        // Create and save the new plant
        const newPlant = new Plant({
            userId: userId,
            type: type,
            images: []
        });
        const createdPlant = await newPlant.save();

        // Update the user's plants array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.plants.push(createdPlant._id);  // Add the new plant's ID to the user's plants array
        await user.save();  // Save the updated user document

        // Return the created plant document
        res.status(201).json(createdPlant);
    } catch (error) {
        res.status(500).json({ message: "Failed to create plant", error: error.message });
    }
}


