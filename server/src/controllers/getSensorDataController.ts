import {Request,Response} from "express";
import Sensor from "../models/Sensor";

export async function getSensorDataController(req:Request, res: Response) {
    const _userId = req.params.userId;
    console.log("Requested userId:", _userId);


    try {
        const sensor = await Sensor.find({ userId: _userId });

        return res.json(sensor);
    }
    catch (error) {
        console.error("Failed to fetch sensor:", error);
        res.status(500).json({ message: "Failed to fetch sensor" });
    }
}


