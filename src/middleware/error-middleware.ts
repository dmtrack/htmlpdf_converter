import { NextFunction, Request, Response } from 'express';
import { IFileError } from '../interfaces/other/other.interface';
import { FileError } from '../errors/file-error';

export function handleFileError(
    err: IFileError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof FileError) {
        res.status(err.status).json({
            text: err.message,
            errors: err.errors,
        });
    }
    // return res.status(500).json({ message: fileError });
}
