import express from 'express';
import tasks from './routes/tasks.js';
import users from './routes/users.js';
const port =  3000;

const app = express();

app.use(express.json());
app.use('/todo', tasks);
app.use('/user', users)

app.listen(port, () => {console.log(`Server listening on port ${port}`)});
