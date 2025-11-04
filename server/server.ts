import express from 'express';
import dotenv from 'dotenv';
import tasks from './routes/tasks.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import files from './routes/files.ts';
import errorHandler from './middleware/error.js';
import { WebSocketServer } from 'ws';
import { WebSocketManager } from './ws/ws-manager.js';
import http from 'http';
import { createApiRouter } from './ws/createApiRouter.ts';

dotenv.config({ path: './.env' });

const port = process.env.PORT;

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const wsManager = new WebSocketManager(wss);

wss.on('connection', (ws, req) => wsManager.handleConnection(ws, req));

app.use('/api', createApiRouter(wsManager));

app.use(express.json());

app.use('/auth', auth);
app.use('/todo', tasks);
app.use('/user', users);
// app.use('/files', authMiddleware, files);
app.use('/files', files);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
