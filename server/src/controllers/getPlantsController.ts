import {Request,Response} from "express";
import Plant from "../models/Plant";

export async function getPlantsController(req:Request, res: Response) {
    const userId = req.params.userId;

    try {
        const plants = await Plant.find({ userId: userId });
        return res.json(plants);
    }
    catch (error) {
        console.error("Failed to fetch plants:", error);
        res.status(500).json({ message: "Failed to fetch plants" });
    }

}