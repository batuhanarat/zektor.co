import {config} from "dotenv";
config();

import express, {Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createUserController } from "./controllers/createUserController";
import { createPlantController } from "./controllers/createPlantController";
import { createImageDataController } from "./controllers/createImageDataController";


const PORT = 5002;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.post("/user", createUserController);
app.post("/plant", createPlantController);
app.post("/plantImage",createImageDataController);

app.get("/hello",(req:Request, res: Response) => {
    res.send("HELLO WORLD");
});



mongoose.connect(process.env.MONGO_URL!).then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
});