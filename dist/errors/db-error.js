"use strict";
module.exports = class DataBaseError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    // static UnauthorizedError() {
    //     return new DataBaseError(401, 'Пользователь не авторизован');
    // }
    static badRequest(message, errors) {
        return new DataBaseError(400, message, errors);
    }
};
