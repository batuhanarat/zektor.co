import { Request, Response } from "express";
import ImageDataModel from "../models/ImageData";
import UserModel from "../models/User";
import Plant from "../models/Plant";


export async function  createImageDataController(req: Request, res: Response) {
    const { base64, order, userId } = req.body;

            try {
            const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ Status: "error", data: "User not found" });
        }
        const plantId = user.plants[order]; // Get the plantId using the order index
        if (!plantId) {
            return res.status(400).send({ Status: "error", data: "Invalid plant order" });
        }
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: "User not found" });
        }

        const newImageData = await ImageDataModel.create({
            image: base64,
            order: order,
            plantId: plantId
        });
        const createdImage = await newImageData.save();


        plant.images.push(createdImage._id);
        await plant.save();

        res.send({ Status: "ok", imageData: newImageData });
        } catch (error) {
            if (error instanceof Error && error.message) {
                res.status(500).json({ message: "Failed to create plant image", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to create plant image", error: "Unknown error occurred" });
            }        }
    }


