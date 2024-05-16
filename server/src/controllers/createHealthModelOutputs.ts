import { Request, Response } from "express";
import ImageData from "../models/ImageData";
import Plant from "../models/Plant";

export async function createHealthModelOutputs(req: Request, res: Response) {
    const { predictions, imageIds, plantIds } = req.body;

    if (!predictions || !imageIds || predictions.length !== imageIds.length) {
        return res.status(400).json({ message: "Invalid predictions or ids data" });
    }

    try {
        for (let i = 0; i < imageIds.length; i++) {
            const imageId = imageIds[i];
            const plantId = plantIds[i]
            const prediction = predictions[i];

            const image = await ImageData.findById(imageId);
            if (!image) {
                return res.status(404).json({ message: `Image with ID ${imageId} not found` });
            }

            image.healthStatus = prediction;
            await image.save();

            const plant = await Plant.findById(plantId);
            if (!plant) {
                return res.status(404).json({ message: `Plant with ID ${plantId} not found` });
            }

            plant.healthStatus = prediction;
            await plant.save();

        }

        res.status(200).json({ message: "Predictions updated successfully" });
    } catch (error) {
        if (error instanceof Error && error.message) {
            res.status(500).json({ message: "Failed to update predictions", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to update predictions", error:"Unknown error occurred"   });

        }
    }
}


