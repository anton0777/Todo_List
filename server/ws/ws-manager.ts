import { WebSocketServer, WebSocket } from 'ws';
import { IWSService, WSMessage } from './IWSService.js';
import jwt from 'jsonwebtoken';

export class WebSocketManager implements IWSService {
  private sockets = new Set<WebSocket>();
  private userSockets = new Map<string, Set<WebSocket>>();

  constructor(private wss: WebSocketServer) {}

  handleConnection = (ws: WebSocket, req: any) => {
    this.sockets.add(ws);

    const token = req.headers['sec-websocket-protocol']?.split(' ')[1];
    console.log(token);
    let userId: string;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        userId = String(decoded.id);

        let set = this.userSockets.get(userId);
        if (!set) {
          set = new Set<WebSocket>();
          this.userSockets.set(userId, set);
        }
        set.add(ws);
      } catch {
        ws.close();
        this.sockets.delete(ws);
        return;
      }
    } else {
      ws.close();
      this.sockets.delete(ws);
      return;
    }

    ws.on('close', () => {
      this.sockets.delete(ws);
      if (userId) {
        const set = this.userSockets.get(userId);
        if (set) {
          set.delete(ws);
          if (set.size === 0) this.userSockets.delete(userId);
        }
      }
    });
  };

  broadcast<T>(msg: WSMessage<T>) {
    const data = JSON.stringify(msg);
    for (const s of this.sockets) {
      if (s.readyState === WebSocket.OPEN) s.send(data);
    }
  }

  sendToUser<T>(userId: number | string, msg: WSMessage<T>) {
    const set = this.userSockets.get(String(userId));
    if (!set) return;
    const data = JSON.stringify(msg);
    for (const s of set) {
      if (s.readyState === WebSocket.OPEN) s.send(data);
    }
  }
}
