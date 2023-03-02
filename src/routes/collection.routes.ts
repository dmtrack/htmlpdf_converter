import { Router } from 'express';
import {
    createCollection,
    getCollections,
    getOneCollection,
    deleteOneCollection,
    getUserCollections,
    updateCollection,
    getTopAmountOfItemsCollection,
} from '../controllers/collectionController';
const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.get('/getcollections', getCollections);
collectionRouter.get('/topamountofitems', getTopAmountOfItemsCollection);
collectionRouter.get('/getusercollections/:userId', getUserCollections);
collectionRouter.get('/getone/:id', getOneCollection);
collectionRouter.put('/update', updateCollection);
collectionRouter.delete('/deleteone/:id', deleteOneCollection);

export default collectionRouter;
