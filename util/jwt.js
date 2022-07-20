import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId,username,role) => {
    const payload = {
        sub: userId,
        username,
        role,
    };
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    });
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return false;
    }
};