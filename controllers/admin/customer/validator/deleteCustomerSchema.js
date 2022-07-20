import Joi from 'joi';


export const deleteCustomerSchema = Joi.object().keys({
    id: Joi.string().required().messages({
        "string.base":"id not valid",
        "any.required":"id required"
    })
});
