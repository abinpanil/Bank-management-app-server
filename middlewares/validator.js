import asyncHandler from 'express-async-handler';

export default function  (validationSchema, reqData = 'body') {
    return asyncHandler(async(req, res, next) => {
        try{
            const data = reqData === 'query' ? req.query : reqData === 'params' ? req.params : req.body;
            await validationSchema.validateAsync(data);
            next();
        }catch (err) {
            res.statusCode=422;
            throw err;
        }
    })
}