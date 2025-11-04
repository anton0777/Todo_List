import { WSMessage } from '../ws/IWSService.js';

export type AuthRequest = {
  body: {
    targetUserId?: number;
    message: WSMessage;
  };
};
