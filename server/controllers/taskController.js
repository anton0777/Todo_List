import { CreateTask, UpdateTask} from '../validators/taskValidator.js';
import jwt from "jsonwebtoken";
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function getTaskWithSubtasks(userId, taskId) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
            userId: userId
        },
        include: { subtasks: true }
    });

    if (!task) {
        throw new Error(`Task with id ${taskId} not found`);
    }

    task.subtasks = await Promise.all(
        task.subtasks.map(async (subtask) => {
            return await getTaskWithSubtasks(userId, subtask.id);
        })
    );

    return task;
}

async function deleteTaskWithSubtasks(userId, taskId) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
            userId: userId
        },
        include: { subtasks: true },
    });

    if (!task) {
        throw new Error(`Task with id ${taskId} not found`);
    }

    await Promise.all(
        task.subtasks.map((subtask) => deleteTaskWithSubtasks(userId, subtask.id))
    );

    await prisma.task.delete({ where: { id: taskId } });
}

function getUserIdFromToken(token) {
    if (!token) {
        throw new Error('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
        throw new Error('Invalid token');
    }

    return parseInt(decoded.id);
}

export const getTasks = async (req,res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const rootTasks = await prisma.task.findMany({
            where: {
                userId: userId,
                parentId: null }
        });

        const tasksWithSubtasks = await Promise.all(
            rootTasks.map(task => getTaskWithSubtasks(userId, task.id))
        );
        res.status(200).json(tasksWithSubtasks);
    }
    catch (err) {
        next(err);
    }
};

export const getTask = async (req,res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const id = req.params.id;
        const task = await getTaskWithSubtasks(userId, parseInt(id));
        if (task.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.status(200).json(task);
    }
    catch (err) {
        next(err);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        req.body.userId = getUserIdFromToken(token);
        const parsed = await CreateTask.parseAsync(req.body);
        const newTask = await prisma.task.create({
            data: parsed,
        });

        return res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req,res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const id = req.params.id;
        const parsed = await UpdateTask.parseAsync(req.body);
        const updateTask = await prisma.task.update({
            where: {
                id: parseInt(id),
                userId: userId,
            },
            data: parsed,
        })
        if (!updateTask) {
            return res.status(404).json({ message: `Task with id ${id} not found` });
        }
        res.status(200).json(updateTask);
    }
    catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const id = parseInt(req.params.id);
        await deleteTaskWithSubtasks(userId, id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};