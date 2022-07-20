import Joi from 'joi';


export const editCustomerSchema = Joi.object().keys({
    customerId: Joi.string().required().messages({
        "string.base":"Customer Id not valid",
        "any.required":"Customer Id required"
    }),
    loanACNo: Joi.string().required().messages({
        "string.base":"Loan Ac No be a string",
        "any.required":"Loan Ac No required"
    }),
    name: Joi.string().required().messages({
        "string.base":"Name must be a string",
        "any.required":"Name required"
    }),
    mobileNo: Joi.string().required().messages({
        "string.base":"Mobile No must be a string",
        "any.required":"Mobile No required"
    }),
    barcode: Joi.string().required().messages({
        "string.base":"Barcode must be a string",
        "any.required":"Barcode required"
    }),
    amountPayable: Joi.string().required().messages({
        "string.base":"Amount Payable must be a string",
        "any.required":"Amount Payable required"
    }),
    noticetype: Joi.string().required().messages({
        "string.base":"Notice Type must be a string",
        "any.required":"Notice Type required"
    }),
});
