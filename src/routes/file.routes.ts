import { Router } from 'express';
import FileMiddleware from '../middleware/file-middleware';
import ValidationMiddleware from '../middleware/validation-middleware';
const fileRouter = Router();
const fileController = require('../controllers/fileController');

fileRouter.post(
    '/upload',
    ValidationMiddleware.validateTypeFileSingle('.zip'),
    FileMiddleware.diskLoader.single('file'),
    fileController.upload
);
fileRouter.get('/getrecords', fileController.getRecords);
// fileRouter.delete('/destroy/:id([0-9]+)', fileController.destroyUser);

export default fileRouter;

//
