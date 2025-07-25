import {Task, CreateTask, UpdateTask} from '../validators/taskValidator.js';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function getTaskWithSubtasks(taskId) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { subtasks: true }
    });

    if (!task) {
        throw new Error(`Task with id ${taskId} not found`);
    }

    task.subtasks = await Promise.all(
        task.subtasks.map(async (subtask) => {
            return await getTaskWithSubtasks(subtask.id);
        })
    );

    return task;
}

async function deleteTaskWithSubtasks(taskId) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { subtasks: true },
    });

    if (!task) {
        throw new Error(`Task with id ${taskId} not found`);
    }

    await Promise.all(
        task.subtasks.map((subtask) => deleteTaskWithSubtasks(subtask.id))
    );

    await prisma.task.delete({ where: { id: taskId } });
}

export const getTasks = async (req,res, next)=>{
    try {
        const rootTasks = await prisma.task.findMany({
            where: { parentId: null }
        });

        const tasksWithSubtasks = await Promise.all(
            rootTasks.map(task => getTaskWithSubtasks(task.id))
        );
        res.status(200).json(tasksWithSubtasks);
    }
    catch (err) {
        next(err);
    }
};

export const getTask = async (req,res, next)=>{
    try {
        const id = req.params.id;
        const task = await getTaskWithSubtasks(parseInt(id));
        res.status(200).json(task);
    }
    catch (err) {
        next(err);
    }
};

export const createTask = async (req, res, next) => {
    try {
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
        const id = req.params.id;
        const parsed = await UpdateTask.parseAsync(req.body);
        const updateTask = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data: parsed,
        })
        res.status(200).json(updateTask);
    }
    catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await deleteTaskWithSubtasks(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};