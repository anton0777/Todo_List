import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getTasks = async (req,res)=>{
    try {
        const tasks = await prisma.task.findMany()
        res.json(tasks);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const getTask = async (req,res)=>{
    const id = req.params.id;
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: parseInt(id)
            }
        })
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
        const {task} = req.body;
        const newTask =
            await prisma.task.create({data: {task}});
        console.log('Created post:', newTask);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const updateTask = async (req,res)=>{
    const id = req.params.id;
    const {task} = req.body;
    try {
        const updateTask = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data: {task},
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
    const id = req.params.id;
    try {
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