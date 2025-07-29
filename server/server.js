import express from 'express';
import tasks from './routes/tasks.js';
import users from './routes/users.js';
import auth from "./routes/auth.js";
import errorHandler from './middleware/error.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const port = 3000;

const app = express();

app.use(express.json());
app.use('/auth', auth);
app.use('/todo', tasks);
app.use('/user', users);
app.use(errorHandler);

app.listen(port, () => {console.log(`Server listening on port ${port}`)});
