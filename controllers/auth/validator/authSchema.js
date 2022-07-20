import Joi from 'joi';


export const loginSchema = Joi.object().keys({
    username: Joi.string().required().messages({
        "string.base":"Username not valid",
        "any.required":"Username required"
    }),
    password: Joi.string().required().messages({
        "string.base":"Password must be a string",
        "any.required":"Password required"
    }),
});
