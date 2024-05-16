// customWebSocket.d.ts
import { WebSocket as WSWebSocket } from 'ws';

declare module 'express' {
  export interface Request {
    file?: Express.Multer.File;
  }
}

export type WebSocket = WSWebSocket;
