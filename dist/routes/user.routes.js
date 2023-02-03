"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.post('/createuser', userController_1.createUser);
userRouter.get('/getusers', userController_1.getAllUsers);
userRouter.get('/getuser/:id([0-9]+)', userController_1.getUser);
userRouter.get('/getuserstatus', userController_1.getUserStatus);
userRouter.delete('/deleteuser', userController_1.deleteUser);
userRouter.post('/signup', userController_1.signUp);
userRouter.post('/signin', userController_1.signIn);
userRouter.put('/block', userController_1.toggleBlock);
userRouter.put('/unblock', userController_1.toggleUnblock);
exports.default = userRouter;
//
