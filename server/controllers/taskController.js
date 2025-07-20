import {Task, CreateTask, UpdateTask} from '../validators/taskValidator.js';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function getTaskWithSubtasks(taskId) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { subtasks: true }
    });

    task.subtasks = await Promise.all(
        task.subtasks.map(async (subtask) => {
            return await getTaskWithSubtasks(subtask.id);
        })
    );

    return task;
}

export const getTasks = async (req,res)=>{
    try {
        const rootTasks = await prisma.task.findMany({
            where: { parentId: null }
        });

        const tasksWithSubtasks = await Promise.all(
            rootTasks.map(task => getTaskWithSubtasks(task.id))
        );
        console.log('get',tasksWithSubtasks);
        res.json(tasksWithSubtasks);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const getTask = async (req,res)=>{
    try {
        const id = req.params.id;
        // const task = await prisma.task.findUnique({
        //     where: {
        //         id: parseInt(id)
        //     }
        // });
        const task = await getTaskWithSubtasks(parseInt(id));

        console.log('get ',task);
        res.json(task);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const createTask = async (req, res) => {
    try {
        const parsed = await CreateTask.parseAsync(req.body);
        const newTask = await prisma.task.create({
            data: parsed
        });
        console.log('Created post:', newTask);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const updateTask = async (req,res)=>{
    try {
        const id = req.params.id;
        const parsed = await UpdateTask.parseAsync(req.body);
        const updateTask = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data: parsed,
        })
        console.log('Updated post:', updateTask);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const deleteTask = async (req, res)=>{
    try {
        const id = req.params.id;
        const deleteTask = await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        })
        console.log('Deleted post:', deleteTask)
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};