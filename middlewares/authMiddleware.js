import asyncHandler from 'express-async-handler';
import { verifyAccessToken } from '../util/jwt.js';

export const authenticateUser = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1];

    if(!token) {
        res.statusCode = 401;
        throw new Error("Session expired, Login again")
    }

    const isAuthenticated = verifyAccessToken(token);
    
    if(!isAuthenticated) {
        res.statusCode = 401;
        throw new Error("Session expired, Login again")
    }

    req.user = isAuthenticated;
    next();
});

export const authenticateAdmin = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1];

    if(!token) {
        res.statusCode = 401;
        throw new Error("Session expired, Login again")
    }

    const isAuthenticated = verifyAccessToken(token);
    
    if(!isAuthenticated) {
        res.statusCode = 401;
        throw new Error("Session expired, Login again")
    }

    if(isAuthenticated.role != 'admin') {
        res.statusCode = 403;
        throw new Error("Unauthorized")
    }

    req.user = isAuthenticated;
    next();
});