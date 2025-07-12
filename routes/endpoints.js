import express from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';
const router = express.Router();

router.get('/todo', getTasks)

router.get('/todo/:id', getTask)

router.post('/todo', createTask)

router.put('/todo/:id', updateTask)

router.delete('/todo/:id', deleteTask)

export default router;