import { createItem } from './../controllers/itemController';
import { Router } from 'express';

const itemRouter = Router();

itemRouter.post('/createitem', createItem);
// router.get('/getusers', getAllUsers);
// router.get('/getuser/:id', getUser);
// router.get('/getuserstatus', getUserStatus);
// router.delete('/deleteuser', deleteUser);

// router.post('/signup', signUp);
// router.post('/signin', signIn);
// router.put('/block', toggleBlock);
// router.put('/unblock', toggleUnblock);

export default itemRouter;
