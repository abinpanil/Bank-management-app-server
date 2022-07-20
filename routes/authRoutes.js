import express from 'express';
import  validator from '../middlewares/validator.js';
import { loginSchema } from '../controllers/auth/validator/authSchema.js'
import { login } from '../controllers/auth/authController.js';

const router = express.Router();

router.post('/login', validator(loginSchema), login);

export default router;