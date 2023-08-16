"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileRouter = (0, express_1.Router)();
const fileController = require('../controllers/fileController');
fileRouter.post('/upload', 
// body('email').isEmail(),
// body('password').isLength({ min: 3, max: 32 }),
fileController.upload);
fileRouter.get('/getlogs', fileController);
fileRouter.delete('/destroy/:id([0-9]+)', fileController.destroyUser);
exports.default = fileRouter;
//
