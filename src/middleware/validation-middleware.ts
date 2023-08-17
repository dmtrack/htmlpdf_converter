import { Response, Request, NextFunction } from 'express';
import { FileError } from '../errors/file-error';

export default class ValidationMiddleware {
    public static validateTypeFileSingle(type: string) {
        return (req: Request, _res: Response, next: NextFunction) => {
            console.log(req.files, 'files');
            console.log(req.file?.filename, 'name');

            if (req.file) next();
            if (req.file?.mimetype === 'application/zip') {
                console.log('подходит', req.file.mimetype);
            }
            // else next(new FileError(500, `Type ${type} is allowed only`));
        };
    }
}
