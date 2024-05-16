import { Request, Response } from "express";
import ImageData from "../models/ImageData";

export async function getAllImagesController(req: Request, res: Response) {
    try {
        const allPlantImages = await ImageData.find({}, 'url'); // Fetch only the 'url' field from all documents
        const urls = allPlantImages.map(image => image.url); // Extract URLs from the documents
        res.json(urls);
    } catch (error) {
        console.error("Failed to fetch images:", error);
        res.status(500).json({ message: "Failed to fetch images" });
    }
}
