import Joi from "joi";

export const getCustomerSchema = Joi.object().keys({
    id: Joi.string().messages({
        "string.base":"Id not valid"
    }),
})