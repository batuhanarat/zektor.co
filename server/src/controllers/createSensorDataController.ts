import {Request,Response} from "express";
import Sensor from "../models/Sensor";
import User from "../models/User";

interface SensorData {
    userId: string;
    temperature?: number;
    humidity?: number;
    lightIntensity?: number;
    co2Level?: number;
}

export async function createPlantController(req:Request, res: Response) {
    const { temperature, humidity,lightIntensity,co2Level, userId } = req.body;

    if (userId === undefined) {
        return res.status(400).json({ message: "UserId is required" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }


    const sensorData:SensorData = { userId };
    if (temperature !== undefined) sensorData.temperature = temperature;
    if (humidity !== undefined) sensorData.humidity = humidity;
    if (lightIntensity !== undefined) sensorData.lightIntensity = lightIntensity;
    if (co2Level !== undefined) sensorData.co2Level = co2Level;

    try {
        const newSensor = new Sensor(sensorData);
        const createdSensor = await newSensor.save();
        res.json(createdSensor);
    } catch (error) {
        if (error instanceof Error && error.message) {
            res.status(500).json({ message: "Failed to create plant", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to create plant", error: "Unknown error occurred" });
        }    }
}

