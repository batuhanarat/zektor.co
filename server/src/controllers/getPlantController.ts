import {Request,Response} from "express";
import Plant from "../models/Plant";

export async function getPlantController(req:Request, res: Response) {
    const plantId = req.params.plantId;

    try {
        const plant = await Plant.findById(plantId);
        return res.json(plant);
    }
    catch (error) {
        console.error("Failed to fetch plant:", error);
        res.status(500).json({ message: "Failed to fetch plant" });
    }
}


