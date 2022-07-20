import express from 'express';
import validator from '../../middlewares/validator.js';
import { upload } from '../../middlewares/fileUpload.js';
import { getCustomerSchema } from '../../controllers/api/customer/validator/getCustomerSchema.js'
import { getCustomer, uploadFile, deleteFile } from '../../controllers/api/customer/customerController.js';

const router = express.Router();

router.get('/', validator(getCustomerSchema,'query'),  getCustomer);
router.post('/upload', upload.single("file"), uploadFile);
router.delete('/delete', deleteFile);

export default router;