import {Task, CreateTask, UpdateTask} from '../validators/taskValidator.js';
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
    try {
        const id = req.params.id;
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        });
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
        const parsed = CreateTask.safeParse(req.body);
        if(parsed.error){
            throw parsed.error;
        }
        const newTask = await prisma.task.create({
            data: parsed.data
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
        const parsed = UpdateTask.safeParse(req.body);
        if(parsed.error){
            throw parsed.error;
        }
        const updateTask = await prisma.task.update({
            where: {
                id: parseInt(id),
            },
            data: parsed.data,
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