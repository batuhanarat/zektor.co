import {Request,Response} from "express";
import Sensor from "../models/Sensor";
import User from "../models/User";

export async function createSensorDataController(req:Request, res: Response) {
    const { temperature, humidity, userId } = req.body;

    if (userId === undefined) {
        return res.status(400).json({ message: "UserId is required" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const newSensor = new Sensor({
        userId: userId,
        temperature: temperature,
        humidity: humidity,
    });
    const createdSensor = await newSensor.save();
    res.json(createdSensor);

}

