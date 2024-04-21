import { Request, Response } from "express";
import ImageDataModel from "../models/ImageData";
import UserModel from "../models/User";

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

        const imageData = await ImageDataModel.create({
            image: base64,
            order: order,
            plantId: plantId
        });

        res.send({ Status: "ok", imageData: imageData });
        } catch (error) {
            res.send({Status: "error" , data:error})
        }
    }


