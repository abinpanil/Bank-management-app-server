import Joi from "joi";

export const getBankSchema = Joi.object().keys({
    id: Joi.string().messages({
        "string.base":"Id not valid"
    }),
})