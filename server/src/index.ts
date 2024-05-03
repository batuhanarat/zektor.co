import {config} from "dotenv";
config();

import express, {Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import { createUserController } from "./controllers/createUserController";
import { createPlantController } from "./controllers/createPlantController";
import { createImageDataController } from "./controllers/createImageDataController";
import { getUserController } from "./controllers/getUserController";
import { getUsersController } from "./controllers/getUsersController";
import { getPlantsController } from "./controllers/getPlantsController";
import { getPlantController } from "./controllers/getPlantController";
import { getImagesDataController } from "./controllers/getImagesDataController";
import { createSensorDataController } from "./controllers/createSensorDataController";
import { getSensorDataController } from "./controllers/getSensorDataController";
import { updateSensorDataController } from "./controllers/updateSensorDataController";


const PORT = 5002;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({storage:storage});


app.post("/user", createUserController);
app.get("/user/:userId", getUserController);
app.get("/users", getUsersController);

app.post("/plant", createPlantController);
app.get("/user/:userId/plants", getPlantsController);
app.get("/plant/:plantId", getPlantController);

app.post("/plantImage", upload.single("image"), createImageDataController);
app.get("/plant/:plantId/images", getImagesDataController);

app.post("/sensor",createSensorDataController);
app.get("/sensor/:userId", getSensorDataController);


app.get("/hello",(req:Request, res: Response) => {
    res.send("HELLO WORLD");
});



mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
});