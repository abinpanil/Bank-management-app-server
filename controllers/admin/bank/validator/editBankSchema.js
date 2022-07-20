import Joi from 'joi';


export const editBankSchema = Joi.object().keys({
    id: Joi.string().required().messages({
        "string.base":"Id not valid",
        "any.required":"Id required"
    }),
    bankName: Joi.string().required().messages({
        "string.base":"Bank Name not valid",
        "any.required":"Bank Name required"
    }),
    address: Joi.string().required().messages({
        "string.base":"Address must be a string",
        "any.required":"Address required"
    }),
    collectionManager: Joi.string().required().messages({
        "string.base":"Collection Manager Name must be a string",
        "any.required":"Collection Manager Name required"
    }),
    collectionManagerUsername: Joi.string().required().messages({
        "string.base":"Collection Manager Username must be a string",
        "any.required":"Collection Manager Username required"
    }),
    collectionManagerPassword: Joi.string().required().messages({
        "string.base":"Collection Manager Password must be a string",
        "any.required":"Collection Manager Password required"
    }),
    legalManager: Joi.string().required().messages({
        "string.base":"Legal Manager Name must be a string",
        "any.required":"Legal Manager Name required"
    }),
    legalManagerUsername: Joi.string().required().messages({
        "string.base":"Legal Manager Username must be a string",
        "any.required":"Legal Manager Username required"
    }),
    legalManagerPassword: Joi.string().required().messages({
        "string.base":"Legal Manager Password must be a string",
        "any.required":"Legal Manager Password required"
    }),
});
