import { Router } from 'express';
import {
    createCollection,
    getCollections,
    getOneCollection,
    deleteOneCollection,
    getUserCollections,
    updateCollection,
    //     getUserStatus,
    //     getAllUsers,
    //     getUser,
    //     deleteUser,
    //     signUp,
    //     signIn,
    //     toggleBlock,
    //     toggleUnblock,
} from '../controllers/collectionController';
const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.get('/getcollections', getCollections);
collectionRouter.get('/getusercollections/:userId', getUserCollections);
collectionRouter.get('/getone/:id', getOneCollection);
collectionRouter.put('/update', updateCollection);
collectionRouter.delete('/deleteone/:id', deleteOneCollection);

// router.get('/getusers', getAllUsers);
// router.get('/getuser/:id', getUser);
// router.get('/getuserstatus', getUserStatus);
// router.delete('/deleteuser', deleteUser);

// router.post('/signup', signUp);
// router.post('/signin', signIn);
// router.put('/block', toggleBlock);
// router.put('/unblock', toggleUnblock);

export default collectionRouter;
