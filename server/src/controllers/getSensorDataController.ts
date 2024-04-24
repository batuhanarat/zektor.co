import {Request,Response} from "express";
import Sensor from "../models/Sensor";

export async function getSensorDataController(req:Request, res: Response) {
    const userId = req.params.userId;

    try {
        const sensor = await Sensor.find({ userId: userId });

        return res.json(sensor);
    }
    catch (error) {
        console.error("Failed to fetch sensor:", error);
        res.status(500).json({ message: "Failed to fetch sensor" });
    }
}


