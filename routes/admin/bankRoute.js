import express from "express";
import validator from '../../middlewares/validator.js';
import { getBankSchema } from '../../controllers/admin/bank/validator/getBankSchema.js';
import { createBankSchema } from '../../controllers/admin/bank/validator/createBankSchema.js';
import { editBankSchema } from '../../controllers/admin/bank/validator/editBankSchema.js';
import { deleteBankSchema } from '../../controllers/admin/bank/validator/deleteBankSchema.js';
import { createBank, deleteBank, editBank, getBank } from "../../controllers/admin/bank/bankController.js";

const router = express.Router();

router.get('/', validator(getBankSchema, 'query'), getBank);
router.post('/create', validator(createBankSchema), createBank);
router.put('/update', validator(editBankSchema), editBank);
router.delete('/delete', validator(deleteBankSchema, 'query'), deleteBank);

export default router;