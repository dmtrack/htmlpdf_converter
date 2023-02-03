import { Router } from 'express';
import {
    createUser,
    getUserStatus,
    getAllUsers,
    getUser,
    deleteUser,
    signUp,
    signIn,
    toggleBlock,
    toggleUnblock,
} from '../controllers/userController';
const userRouter = Router();

userRouter.post('/createuser', createUser);
userRouter.get('/getusers', getAllUsers);
userRouter.get('/getuser/:id([0-9]+)', getUser);
userRouter.get('/getuserstatus', getUserStatus);
userRouter.delete('/deleteuser', deleteUser);

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.put('/block', toggleBlock);
userRouter.put('/unblock', toggleUnblock);

export default userRouter;

//
