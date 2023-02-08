import { NextFunction, Request, Response } from 'express';
import { IApiError } from '../interfaces/other/other.interface';

const ApiError = require('../exceptions/api-error');

module.exports = function (
    err: IApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);

    if (err instanceof ApiError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({ message: err.message });
};
