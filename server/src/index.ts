import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import multer from 'multer';

import { createUserController } from './controllers/createUserController';
import { createPlantController } from './controllers/createPlantController';
import { createImageDataController } from './controllers/createImageDataController';
import { getUserController } from './controllers/getUserController';
import { getUsersController } from './controllers/getUsersController';
import { getPlantsController } from './controllers/getPlantsController';
import { getPlantController } from './controllers/getPlantController';
import { getImagesDataController } from './controllers/getImagesDataController';
import { createSensorDataController } from './controllers/createSensorDataController';
import { getSensorDataController } from './controllers/getSensorDataController';
import { updateSensorDataController } from './controllers/updateSensorDataController';
import { createImagesDataController } from './controllers/createImagesDataController';
import { createDevelopmentModelOutputs } from './controllers/createDevelopmentModelOutputs';
import { createHealthModelOutputs } from './controllers/createHealthModelOutputs';

import { getImageController } from './controllers/getImageController';
import { WebSocket } from './types/customWebSocket'; // Custom WebSocket import
import { getAllImagesController } from './controllers/getAllImagesController';

const PORT = 5004;
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors({ origin: '*' }));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadMultiple = multer({ storage: multer.memoryStorage() });

let clients: WebSocket[] = [];

wss.on('connection', (ws: WebSocket) => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
  });
});

app.post('/user', createUserController);
app.get('/user/:userId', getUserController);
app.get('/users', getUsersController);

app.post('/plant', createPlantController);
app.get('/user/:userId/plants', getPlantsController);
app.get('/plant/:plantId', getPlantController);

app.post('/plantImage', upload.single('image'), (req: Request, res: Response) => {
  createImageDataController(req, res, clients);
});
app.post('/plantImages', uploadMultiple.array('images'), createImagesDataController);
app.get('/plant/:plantId/images', getImagesDataController);
app.get('/plantImageSync/:imageId', getImageController);

app.post('/sensor', createSensorDataController);
app.get('/sensor/:userId', getSensorDataController);
app.get('/allImages', getAllImagesController);
app.post('/developmentPhaseOutput', (req: Request, res: Response) => {
    createDevelopmentModelOutputs(req, res, clients);
  });
  app.post('/healthStatusOutput', (req: Request, res: Response) => {
    createHealthModelOutputs(req, res, clients);
  });


app.get('/hello', (req: Request, res: Response) => {
  res.send('HELLO WORLD');
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
