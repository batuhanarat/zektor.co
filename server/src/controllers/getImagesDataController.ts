import { Request, Response } from "express";

import ImageData from "../models/ImageData";


export async function getImagesDataController(req: Request, res: Response) {

        const plantId = req.params.plantId;

        try {
            const plantImages = await ImageData.find({ plantId: plantId });
            res.json(plantImages.map(img => ({
                url: img.url,
                date: img.date,
                developmentPhase : img.developmentPhase,
                healthStatus: img.healthStatus,
            })));

                } catch (error) {
            console.error("Failed to fetch images:", error);
        res.status(500).json({ message: "Failed to fetch images" });
        }
    }


