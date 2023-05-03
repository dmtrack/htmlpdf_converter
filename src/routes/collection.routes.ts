import { Router } from 'express';
import {
    createCollection,
    getCollections,
    getOneCollection,
    deleteOneCollection,
    getUserCollections,
    updateCollection,
    getTopAmountOfItemsCollection,
    getThemes,
} from '../controllers/collectionController';
const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.get('/getcollections', getCollections);
collectionRouter.get('/getthemes', getThemes);
collectionRouter.get('/topamountofitems', getTopAmountOfItemsCollection);
collectionRouter.get('/getusercollections/:userId', getUserCollections);
collectionRouter.get('/getone/:id', getOneCollection);
collectionRouter.put('/update', updateCollection);
collectionRouter.delete('/deleteone/:id', deleteOneCollection);

export default collectionRouter;
