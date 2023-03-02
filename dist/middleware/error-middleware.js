"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError = require('../errors/api-error');
module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({ message: err.message });
};
