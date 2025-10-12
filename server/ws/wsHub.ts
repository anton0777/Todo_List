import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { ValueOf } from 'type-fest';

export const WSMessageType = {
  file_processing_complete: 'file_processing_complete',
  file_processing_started: 'file_processing_started',
} as const;
export type WSMessage<T> = {
  type: ValueOf<typeof WSMessageType>;
  payload?: T;
};

export class WSHub {
  private wss: WebSocketServer;
  private sockets = new Set<WebSocket>();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (socket) => {
      this.sockets.add(socket);
      socket.on('close', () => this.sockets.delete(socket));
    });
  }

  broadcast<T>(msg: WSMessage<T>) {
    const data = JSON.stringify(msg);
    for (const socket of this.sockets) {
      if (socket.readyState === WebSocket.OPEN) socket.send(data);
    }
  }
}
