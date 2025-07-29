import { CreateUser, UpdateUser} from "../validators/userValidator.js";
import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';

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
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
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
        parsed.password = await bcrypt.hash(parsed.password, 6);
        const newUser = await prisma.user.create({
                data: parsed
            });
        res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
    }
    catch (err) {
        next(err);
    }
};

export const updateUser = async (req,res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const parsed = await UpdateUser.parseAsync(req.body);
        if (parsed.password) {
            parsed.password = await bcrypt.hash(parsed.password, 6);
        }
        const updateUser = await prisma.user.update({
            where: {
                id: userId,
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
        const token = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(token);
        const deleteUser = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
};