import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

export type WSMessage<T = unknown> = { type: string; payload?: T };

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

  broadcast(msg: WSMessage) {
    const data = JSON.stringify(msg);
    for (const socket of this.sockets) {
      if (socket.readyState === WebSocket.OPEN) socket.send(data);
    }
  }
}
