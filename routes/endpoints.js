const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

router.get('/todo', async (req,res)=>{
    // res.json({nodes: "hello world"});
    try {
        const tasks = await prisma.task.findMany()
        res.json(tasks);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
})

router.post('/todo', async (req, res) => {
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
})

router.get('/todo/:id', async (req,res)=>{
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
})

module.exports = router;