import {User, CreateUser, UpdateUser} from "../validators/userValidator.js"
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getUsers = async (req,res)=>{
    try{
        const user = await prisma.user.findMany();
        res.json(user);
    }
    catch(err){
        res.status(500);
        console.log(err);
    }
    res.end();
}

export const getUser = async (req,res)=>{
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
}

export const createUser = async (req, res) => {
    try {
        const parsed = await CreateUser.parseAsync(req.body);
        const newUser = await prisma.user.create({
                data: parsed
            });
        console.log('Created post:', newUser);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const updateUser = async (req,res)=>{
    try {
        const id = req.params.id;
        const parsed = await UpdateUser.parseAsync(req.body);
        const updateUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: parsed
        })
        console.log('Updated post:', updateUser);
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};

export const deleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })
        console.log('Deleted post:', deleteUser)
    }
    catch (err) {
        res.status(500);
        console.log(err);
    }
    res.end();
};