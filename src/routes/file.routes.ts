import { Router } from 'express';
const fileRouter = Router();
const fileController = require('../controllers/fileController');

fileRouter.post('/upload', fileController.upload);
// fileRouter.get('/getlogs', fileController);
// fileRouter.delete('/destroy/:id([0-9]+)', fileController.destroyUser);

export default fileRouter;

//
