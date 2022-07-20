import asyncHandler from 'express-async-handler';
import Users from '../../model/userModel.js';
import { generateAccessToken } from '../../util/jwt.js';

// @desc   login user and get token
// @route  POST /auth/login
// @access Public
export const login = asyncHandler(async(req, res)=>{
    const {username, password} = req.body;
    const user = await Users.findOne({ username: username });
    if(!user) {
        res.statusCode = 401;
        throw new Error('Invalid Credentials');
    }

    if(user.password != password) {
        res.statusCode = 401;
        throw new Error('Invalid Credentials');
    }

    const token = await generateAccessToken(user._id, user.username, user.role);

    res.status(200).json({
        status: 'success',
        data: {accessToken: token, user},
    });
});
