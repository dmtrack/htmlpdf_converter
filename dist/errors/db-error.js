"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
class DataBaseError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static badRequest(message, errors) {
        return new DataBaseError(400, message, errors);
    }
}
exports.DataBaseError = DataBaseError;
