import express from "express";
import validator from '../../middlewares/validator.js';
import { getCustomerSchema } from '../../controllers/admin/customer/validator/getCustomerSchema.js';
import { createCustomerSchema } from '../../controllers/admin/customer/validator/createCustomerSchema.js';
import { editCustomerSchema } from '../../controllers/admin/customer/validator/editCustomerSchema.js';
import { deleteCustomerSchema } from '../../controllers/admin/customer/validator/deleteCustomerSchema.js'
import { upload } from '../../middlewares/fileUpload.js';
import { createCustomer, deleteCustomer, editCustomer, getCustomer } from '../../controllers/admin/customer/customerController.js'

const router = express.Router();

router.get('/', validator(getCustomerSchema, 'query'), getCustomer);
router.post('/create', upload.single("file"), createCustomer);
router.put('/update', upload.single("file"), editCustomer);
router.delete('/delete', validator(deleteCustomerSchema, 'query'), deleteCustomer);

export default router;