import {config} from "dotenv";
config();

import express, {Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createUserController } from "./controllers/createUserController";
import { createPlantController } from "./controllers/createPlantController";
import { createImageDataController } from "./controllers/createImageDataController";
import { getUserController } from "./controllers/getUserController";
import { getUsersController } from "./controllers/getUsersController";
import { getPlantsController } from "./controllers/getPlantsController";
import { getPlantController } from "./controllers/getPlantController";
import { getImagesDataController } from "./controllers/getImagesDataController";





const PORT = 5002;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.post("/user", createUserController);
app.get("/user/:userId", getUserController);
app.get("/users", getUsersController);

app.post("/plant", createPlantController);
app.get("/user/:userId/plants", getPlantsController);
app.get("/plant/:plantId", getPlantController);

app.post("/plantImage",createImageDataController);
app.get("/plant/:plantId/images", getImagesDataController);

app.get("/hello",(req:Request, res: Response) => {
    res.send("HELLO WORLD");
});



mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
});