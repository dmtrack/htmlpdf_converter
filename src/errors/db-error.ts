export class DataBaseError extends Error {
    status;
    errors;
    constructor(status: number, message: string, errors: [] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message: string, errors: []) {
        return new DataBaseError(400, message, errors);
    }
}
