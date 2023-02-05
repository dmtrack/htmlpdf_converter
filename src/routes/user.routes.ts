import { Router } from 'express';

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.post('/logout', userController.logout);
userRouter.get('/activate/:link', userController.activate);
userRouter.get('/refresh', userController.refreshToken);

userRouter.post('/createuser', userController.createUser);
userRouter.get('/getusers', userController.getAllUsers);
userRouter.get('/getuser/:id([0-9]+)', userController.getUser);
userRouter.get('/getuserstatus', userController.getUserStatus);
userRouter.delete('/deleteuser', userController.deleteUser);
userRouter.put('/block', userController.toggleBlock);
userRouter.put('/unblock', userController.toggleUnblock);

export default userRouter;

//
