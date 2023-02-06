module.exports = class ApiError extends Error {
    status;
    errors: any;
    constructor(status: number, message: string, errors: [] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static badRequest(message: string, errors: []) {
        return new ApiError(400, message, errors);
    }
    // static internal(message: string) {
    //     return new ApiError(500, message);
    // }
    // static forbidden(message: string) {
    //     return new ApiError(403, message);
    // }
};
