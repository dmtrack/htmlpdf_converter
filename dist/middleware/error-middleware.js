"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileError = void 0;
const file_error_1 = require("../errors/file-error");
function handleFileError(err, req, res, next) {
    if (err instanceof file_error_1.FileError) {
        res.status(err.status).json({
            text: err.message,
            errors: err.errors,
        });
    }
    // return res.status(500).json({ message: fileError });
}
exports.handleFileError = handleFileError;
