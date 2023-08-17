"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomError_1 = require("../exceptions/CustomError");
const fileRouter = (0, express_1.Router)();
const fileController = require('../controllers/fileController');
const logger = require('../utils/logger');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    putSingleFilesInArray: true,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'application/zip') {
            logger.error(`file: ${file.originalname} has no zip format`);
            return cb(new CustomError_1.CustomError('Filetype is not a zip', 500, 'additionalInfo'));
        }
        else {
            cb(null, true);
        }
    },
    //     else if (file.size > 1000) {
    //         console.log('size error');
    //         cb(
    //             new CustomError(
    //                 'File-size too large...',
    //                 500,
    //                 'You can send not more than 2gb per file'
    //             )
    //         );
    //     }
});
fileRouter.post('/upload', 
// ValidationMiddleware.validateTypeFileSingle('.zip'),
upload.array('file'), fileController.upload);
fileRouter.get('/getrecords', fileController.getRecords);
// fileRouter.delete('/destroy/:id([0-9]+)', fileController.destroyUser);
exports.default = fileRouter;
//
