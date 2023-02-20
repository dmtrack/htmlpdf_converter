import { Router } from 'express';
import {
    createItem,
    getItems,
    getOneItem,
    deleteOneItem,
    getCollectionItems,
    updateItem,
} from '../controllers/itemController';
const itemRouter = Router();

itemRouter.post('/create', createItem);
itemRouter.get('/getitems', getItems);
itemRouter.get('/getcollectionitems/:collectionId', getCollectionItems);
itemRouter.get('/getone/:id', getOneItem);
itemRouter.put('/update', updateItem);
itemRouter.delete('/deleteone/:id', deleteOneItem);

export default itemRouter;

//
