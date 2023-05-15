"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controllers/itemController");
const itemRouter = (0, express_1.Router)();
itemRouter.post('/create', itemController_1.createItem);
itemRouter.post('/setlike', itemController_1.setLike);
itemRouter.post('/unsetlike', itemController_1.unsetLike);
itemRouter.get('/getitems', itemController_1.getItems);
itemRouter.get('/toprated', itemController_1.getTopRatedItems);
itemRouter.get('/topcomments', itemController_1.getTopCommentedItems);
itemRouter.get('/popular_tags', itemController_1.handleGetMostPopularTags);
itemRouter.get('/tags', itemController_1.getTags);
itemRouter.get('/getcollectionitems/:collectionId', itemController_1.getCollectionItems);
itemRouter.get('/getone/:id', itemController_1.getOneItem);
itemRouter.put('/update', itemController_1.updateItem);
itemRouter.delete('/deleteone/:id', itemController_1.deleteOneItem);
exports.default = itemRouter;
//
