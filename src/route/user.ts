import { Router } from 'express';
import { createUser, editUser } from '../controller';
import { validateCreateUser, validateEditUser } from '../middleware/validators';

export const userRoute = Router();

userRoute.post('/', validateCreateUser, createUser);
userRoute.put('/', validateEditUser, editUser);
