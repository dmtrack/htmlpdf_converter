export class FileError extends Error {
    status;
    errors;
    constructor(status: number, message: string, errors: [] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
    }
}
