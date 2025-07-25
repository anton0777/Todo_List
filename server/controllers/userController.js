import {User, CreateUser, UpdateUser} from "../validators/userValidator.js"
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const getUsers = async (req,res, next)=>{
    try{
        const user = await prisma.user.findMany();
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const getUser = async (req,res, next)=>{
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const parsed = await CreateUser.parseAsync(req.body);
        const newUser = await prisma.user.create({
                data: parsed
            });
        res.status(201).json(newUser);
    }
    catch (err) {
        next(err);
    }
};

export const updateUser = async (req,res, next)=>{
    try {
        const id = req.params.id;
        const parsed = await UpdateUser.parseAsync(req.body);
        const updateUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: parsed
        })
        res.status(200).json(updateUser);
    }
    catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
};