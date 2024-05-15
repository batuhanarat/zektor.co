import { Request, Response } from "express";
import * as WebSocket from 'ws';

// Create WebSocket server
const wss = new WebSocket.Server({ port: 5005 });

// Listen for WebSocket connections
wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    // Listen for messages from the client
    ws.on('message', (message: string) => {
        console.log('Received message:', message);
    });
});

export async function createImageDataController(req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
    }

    const imageBuffer = req.file.buffer;

    // Send the image data to WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(imageBuffer);
        }
    });

    // Return success response
    res.json({ message: 'Image data sent to WebSocket clients' });
}
