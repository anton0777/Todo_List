import express from 'express';
import dotenv from 'dotenv';
import tasks from './routes/tasks.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import files from './routes/files.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { WSHub } from './ws/wsHub.js';

dotenv.config({ path: './.env' });

const port = 3000;

const app = express();
app.use(express.json());

app.use('/auth', auth);
app.use('/todo', tasks);
app.use('/user', users);
app.use('/files', files);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
export const wsHub = new WSHub(server);
