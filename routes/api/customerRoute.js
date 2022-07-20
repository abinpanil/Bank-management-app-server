import express from 'express';
import validator from '../../middlewares/validator.js';
import { getCustomerSchema } from '../../controllers/api/customer/validator/getCustomerSchema.js'
import { getCustomer } from '../../controllers/api/customer/customerController.js';

const router = express.Router();

router.get('/', validator(getCustomerSchema,'query'),  getCustomer);


export default router;