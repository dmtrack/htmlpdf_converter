"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../exceptions/CustomError");
function handleError(err, req, res, next) {
    let customError = err;
    if (!(err instanceof CustomError_1.CustomError)) {
        customError = new CustomError_1.CustomError('Oh no, this is embarrasing. We are having troubles my friend');
    }
    res.status(customError.status).send(customError);
}
exports.default = handleError;
