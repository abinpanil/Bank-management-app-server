import express from 'express';
import authRouter from './authRoutes.js';
import apiRouter from './api/index.js';
import adminRouter from './admin/index.js';
import { authenticateUser, authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', authenticateUser,apiRouter);
router.use('/admin', authenticateAdmin, adminRouter);

router.get('/', (req, res) => {
    res.status(200).json({success: true, version: "1.0.0"})
})

export default router;