import express from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
const router = express.Router();

router.get('/', getUser)

router.get('/:id', getUser)

router.post('/', createUser)

router.put('/', updateUser)

router.delete('/', deleteUser)

export default router;