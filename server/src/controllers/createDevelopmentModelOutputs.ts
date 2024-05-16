import { Request, Response } from "express";
import ImageData from "../models/ImageData";
import Plant from "../models/Plant";
import { WebSocket } from '../types/customWebSocket'; // Custom WebSocket import


export async function createDevelopmentModelOutputs(req: Request, res: Response, clients: WebSocket[]) {
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

            image.developmentPhase = prediction;
            await image.save();

            const plant = await Plant.findById(plantId);
            if (!plant) {
                return res.status(404).json({ message: `Plant with ID ${plantId} not found` });
            }

            plant.developmentPhase = prediction;
            await plant.save();
          /*  const developmentPhaseUpdate = {
                type: 'development_phase_update', // Include the type field
                plantId: plantId,
                developmentPhase: prediction,
            };
            */
//            clients.forEach((client) => client.send(JSON.stringify(developmentPhaseUpdate)));

        }
        const developmentPhaseUpdate = {
            type: 'development_phase_update', // Include the type field
        };
         clients.forEach((client) => client.send(JSON.stringify(developmentPhaseUpdate)));


        res.status(200).json({ message: "Predictions updated successfully" });
    } catch (error) {
        if (error instanceof Error && error.message) {
            res.status(500).json({ message: "Failed to update predictions", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to update predictions", error:"Unknown error occurred"   });

        }
    }
}


