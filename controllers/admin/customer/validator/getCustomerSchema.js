import Joi from "joi";

export const getCustomerSchema = Joi.object().keys({
    id: Joi.string().messages({
        "string.base":"Id not valid"
    }),
    bankId: Joi.string().messages({
        "string.base":"BankId not valid"
    })
});