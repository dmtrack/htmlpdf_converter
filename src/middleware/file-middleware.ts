import path from 'path';
// eslint-disable-next-line no-unused-vars
import multer from 'multer';

export default class FileMiddleware {
    public static readonly memoryLoader = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5000,
        },
    });

    public static readonly diskLoader = multer({
        storage: multer.diskStorage({
            destination: (_req, _file, cb) => {
                console.log(_req.files, 'name');
                cb(null, path.join(__dirname, '../upload'));
            },
            filename: (_req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
        limits: {
            fileSize: 5000,
        },
    });

    // multer({
    //     storage: multer.diskStorage({
    //         destination: (_req, _file, cb) => {
    //             console.log(_req.files, 'name');
    //             cb(null, path.join(__dirname, '../upload'));
    //         },
    //         filename: (_req, file, cb) => {
    //             cb(null, file.originalname);
    //         },
    //     }),
    //     limits: {
    //         fileSize: 5000,
    //     },
    // });
}
