"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileError = void 0;
class FileError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
    }
}
exports.FileError = FileError;
