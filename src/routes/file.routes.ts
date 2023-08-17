import { Router } from 'express';
import FileMiddleware from '../middleware/file-middleware';
import ValidationMiddleware from '../middleware/validation-middleware';
const fileRouter = Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, putSingleFilesInArray: true });

fileRouter.post(
    '/upload',
    // ValidationMiddleware.validateTypeFileSingle('.zip'),
    upload.array('file'),
    fileController.upload
);
fileRouter.get('/getrecords', fileController.getRecords);
// fileRouter.delete('/destroy/:id([0-9]+)', fileController.destroyUser);

export default fileRouter;

//
