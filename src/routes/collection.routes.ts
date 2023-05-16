import { Router } from 'express';
import {
    createCollection,
    getCollections,
    getOneCollection,
    deleteOneCollection,
    getUserCollections,
    updateCollection,
    getTopAmountOfItemsCollection,
    getThemes, getItemConfigs, editCollection
} from '../controllers/collectionController'
const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.post('/edit', editCollection)
collectionRouter.get('/getcollections', getCollections);
collectionRouter.get('/getthemes', getThemes);
collectionRouter.get('/topamountofitems', getTopAmountOfItemsCollection);
collectionRouter.get('/getusercollections/:userId', getUserCollections);
collectionRouter.get('/getone/:id', getOneCollection);
collectionRouter.get('/item_configs/:collectionId', getItemConfigs)
collectionRouter.put('/update', updateCollection);
collectionRouter.delete('/delete/:id', deleteOneCollection);

export default collectionRouter;
