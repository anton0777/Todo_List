import { Router } from 'express';
import { WebSocketManager } from './ws-manager.ts';
import { AuthRequest } from '../types/auth.ts';

export function createApiRouter(wsManager: WebSocketManager): Router {
  const router = Router();

  // Что то делаем затем отправляем сообщения конкретному пользователю
  router.post('/endpoint1', (req: AuthRequest, res) => {
    const { targetUserId, message } = req.body;
    if (!targetUserId || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    wsManager.sendToUser(targetUserId, message);
  });

  // Что то делаем затем отправляем сообщения всем активным пользователям
  router.post('/some-endpoint-with-broadcast', (req: AuthRequest, res) => {
    const { message } = req.body;
    wsManager.broadcast(message);
    res.json({ success: true });
  });

  return router;
}
