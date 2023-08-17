"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationMiddleware {
    static validateTypeFileSingle(type) {
        return (req, _res, next) => {
            var _a, _b;
            console.log(req.files, 'files');
            console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename, 'name');
            if (req.file)
                next();
            if (((_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype) === 'application/zip') {
                console.log('подходит', req.file.mimetype);
            }
            // else next(new FileError(500, `Type ${type} is allowed only`));
        };
    }
}
exports.default = ValidationMiddleware;
