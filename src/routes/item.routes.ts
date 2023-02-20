import { Router } from 'express';
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/auth-middleware');
const itemRouter = Router();

itemRouter.post('/createitem', itemController.createItem);

// userRouter.get('/activate/:link', userController.activate);
// userRouter.post('/login', userController.login);
// userRouter.post('/logout', userController.logout);
// userRouter.post('/reconnect', userController.reconnect);
// userRouter.get('/refresh', userController.refresh);
// userRouter.get('/getusers', authMiddleware, userController.getAllUsers);
// userRouter.put('/block', userController.toggleBlock);
// userRouter.put('/unblock', userController.toggleUnBlock);
// userRouter.delete('/delete', userController.deleteUser);

// userRouter.get('/getuser/:id([0-9]+)', userController.getUser);

export default itemRouter;

//
