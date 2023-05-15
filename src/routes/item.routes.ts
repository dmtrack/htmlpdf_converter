import { Router } from 'express';
import {
    createItem,
    getItems,
    getOneItem,
    deleteOneItem,
    getCollectionItems,
    updateItem,
    setLike,
    unsetLike,
    getTopRatedItems,
    handleGetMostPopularTags,
    getTags,
    getTopCommentedItems,
} from '../controllers/itemController';
const itemRouter = Router();

itemRouter.post('/create', createItem);
itemRouter.post('/setlike', setLike);
itemRouter.post('/unsetlike', unsetLike);
itemRouter.get('/getitems', getItems);
itemRouter.get('/toprated', getTopRatedItems);
itemRouter.get('/topcommented', getTopCommentedItems);
itemRouter.get('/popular_tags', handleGetMostPopularTags);
itemRouter.get('/tags', getTags);
itemRouter.get('/getcollectionitems/:collectionId', getCollectionItems);
itemRouter.get('/getone/:id', getOneItem);
itemRouter.put('/update', updateItem);
itemRouter.delete('/deleteone/:id', deleteOneItem);

export default itemRouter;

//
