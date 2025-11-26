// import { WSMessage } from '../ws/IWSService.js';
//
// export type AuthRequest = {
//   body: {
//     targetUserId?: number;
//     message: WSMessage;
//   };
// };

export type RegisterData = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  email: string;
  name: string;
  token?: string;
};

export type LoginData = {
  email: string;
  password: string;
};
