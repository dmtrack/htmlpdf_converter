import { Router } from 'express';

const userRouter = Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth-middleware');
const { body } = require('express-validator');

userRouter.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);

userRouter.get('/activate/:link', userController.activate);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/reconnect', userController.reconnect);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/getusers', authMiddleware, userController.getAllUsers);
userRouter.put('/block', userController.toggleBlock);
userRouter.put('/unblock', userController.toggleUnBlock);
userRouter.delete('/delete', userController.deleteUser);

// userRouter.post('/createuser', userController.createUser);

// userRouter.get('/getuser/:id([0-9]+)', userController.getUser);
// userRouter.get('/getuserstatus', userController.getUserStatus);

export default userRouter;

//
