import {config} from "dotenv";
config();

import express, {Request,Response} from "express";
import mongoose from "mongoose";
import cors from "cors";


const PORT = 5002;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());


app.get("/hello",(req:Request, res: Response) => {
    res.send("gg");
});

mongoose.connect(process.env.MONGO_URL!).then( () => {
    app.listen(PORT);
});