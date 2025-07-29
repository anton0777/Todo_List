import {CreateUser} from "../validators/userValidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const registerUser = async (req, res, next) => {
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

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const accessToken = jwt
            .sign(
                {
                    id: user.id,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

        res.status(200).json({ id: user.id, email: user.email, name: user.name, token: accessToken });
    }
    catch (err) {
        next(err);
    }
}