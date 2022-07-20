import express from 'express';
import bankRoute from './bankRoute.js';
import customerRoute from './customerRoute.js';

const router = express.Router();

router.use('/bank', bankRoute);
router.use('/customer', customerRoute);

export default router;