import { Request, Response } from 'express';
import UserModel from '../models/User';
import { WebSocket } from '../types/customWebSocket'; // Custom WebSocket import

export async function createImageDataController(req: Request, res: Response, clients: WebSocket[]) {
  if (!req.file) {
    return res.status(400).send({ Status: 'error', message: 'No image file provided' });
  }

  const { order, userId } = req.body;
  const file = req.file;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ Status: 'error', data: 'User not found' });
    }
    const plantId = user.plants[order]; // Get the plantId using the order index
    if (!plantId) {
      return res.status(400).send({ Status: 'error', data: 'Plant is initalizing..' });
    }

    const imageData = {
      plantId: plantId, // Replace with actual plant ID if available
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`, // Convert to base64 data URL
    };

    console.log("how many clients: " +clients.length);
    // Broadcast the new image to all connected clients
    clients.forEach((client) => client.send(JSON.stringify(imageData)));

    res.send({ Status: 'ok', imageData });
  } catch (error) {
    if (error instanceof Error && error.message) {
      res.status(500).json({ message: 'Failed to create plant image', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to create plant image', error: 'Unknown error occurred' });
    }
  }
}
