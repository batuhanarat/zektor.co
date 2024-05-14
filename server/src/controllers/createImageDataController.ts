import { Request, Response } from "express";
import AWS from 'aws-sdk';
import ImageDataModel from "../models/ImageData";
import UserModel from "../models/User";
import Plant from "../models/Plant";


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});
const s3 = new AWS.S3();

export async function createImageDataController(req: Request, res: Response) {

    if (!req.file) {
        return res.status(400).send({ Status: "error", message: "No image file provided" });
    }

    const { order, userId } = req.body;
    const file = req.file;
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
        return res.status(500).send({ Status: "error", message: "Server configuration error: AWS bucket name is not defined." });
    }
        try {
            const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ Status: "error", data: "User not found" });
        }
        const plantId = user.plants[order]; // Get the plantId using the order index
        if (!plantId) {
            return res.status(400).send({ Status: "error", data: "Invalid plant order" });
        }

        const s3Params = {
            Bucket: bucketName,  // Use the validated bucket name
            Key: `plant_images/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };


        const data = await s3.upload(s3Params).promise();
        console.log( "location: " +data.Location)

        const newImageData = await ImageDataModel.create({
            plantId: plantId,
            url: data.Location,  // Save the URL instead of the image data
            date: new Date()
        });

        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: "Plant not found" });
        }

        plant.images.push(newImageData._id);
        await plant.save();


        res.send({ Status: "ok", imageData: newImageData });
        } catch (error) {
            if (error instanceof Error && error.message) {
                res.status(500).json({ message: "Failed to create plant image", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to create plant image", error: "Unknown error occurred" });
            }
        }
    }


