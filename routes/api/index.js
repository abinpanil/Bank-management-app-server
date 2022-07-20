import express from 'express';
import { authenticateUser } from '../../middlewares/authMiddleware.js'
import customerRoute from './customerRoute.js';

const router = express.Router();

router.use('/customer', authenticateUser, customerRoute);

export default router;