import { Request, Response } from "express";

import ImageData from "../models/ImageData";


export async function getImageDataController(req: Request, res: Response) {

        const imageId = req.params.imageId;

        try {
            const plantImage = await ImageData.findById(imageId);
            res.json(plantImage);

                } catch (error) {
            console.error("Failed to fetch images:", error);
        res.status(500).json({ message: "Failed to fetch images" });
        }
    }


