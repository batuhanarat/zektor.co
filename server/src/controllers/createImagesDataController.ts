import { Request, Response } from "express";
import { spawn } from "child_process";
import AWS from 'aws-sdk';
import ImageDataModel from "../models/ImageData";
import UserModel from "../models/User";
import Plant from "../models/Plant";

// Define response element type
type ResponseElement = {
    Status: string;
    message?: string;
    imageData?: any; // Adjust the type based on what imageData contains
    error?: string;  // Optional error message property
};

// AWS S3 configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});
const s3 = new AWS.S3();

export async function createImagesDataController(req: Request, res: Response) {
    // Ensure req.files is treated as an array of files
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
        return res.status(400).send({ Status: "error", message: "No image files provided" });
    }

    const files = req.files as Express.Multer.File[]; // This casts req.files to the correct type
    const { userId } = req.body; //hi
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).send({ Status: "error", message: "User not found" });
    }
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
        return res.status(500).send({ Status: "error", message: "Server configuration error: AWS bucket name is not defined." });
    }

    let responses: ResponseElement[] = [];
    let imagesData: { id: string, image: string }[] = [];
    for (const [index, file] of files.entries()) {
        const plantId = user.plants[index];
        if (!plantId) {
            responses.push({ Status: "error", message: `Invalid plant order for image ${index}` });
            continue;
        }

        const s3Params = {
            Bucket: bucketName,
            Key: `plant_images/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            const data = await s3.upload(s3Params).promise();
            console.log("location: " + data.Location)

            const newImageData = await ImageDataModel.create({
                plantId: plantId,
                url: data.Location,
                date: new Date()
            });
            const base64ImageData = file.buffer.toString('base64');
            imagesData.push({ id: newImageData._id.toString(), image: base64ImageData });

            const plant = await Plant.findById(plantId);
            if (!plant) {
                responses.push({ Status: "error", message: `Plant not found for image ${index}` });
                continue;
            }

            plant.images.push(newImageData._id);
            await plant.save();
            responses.push({ Status: "ok", imageData: newImageData });
        } catch (error: any) {
            if (error instanceof Error) {
                responses.push({ Status: "error", message: `Failed to upload image ${index}`, error: error.message });
            } else {
                responses.push({ Status: "error", message: `Failed to upload image ${index}`, error: "An unknown error occurred" });
            }
        }
    }


    // Spawn a new process to run the Python script
    const pythonProcess = spawn('python3', ['/home/ubuntu/Comp491/model_upload_new.py', JSON.stringify(imagesData)]
    , {
        cwd: '/home/ubuntu/Comp491'
      });


    // Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });


    res.json(responses);
}
