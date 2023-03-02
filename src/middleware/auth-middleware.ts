import { NextFunction, Request, Response } from 'express';
const ApiError = require('../errors/api-error');
const tokenService = require('../services//token.service');

interface IMiddlewareRequest extends Request {
    user: string;
}

module.exports = function (
    req: IMiddlewareRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader?.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
