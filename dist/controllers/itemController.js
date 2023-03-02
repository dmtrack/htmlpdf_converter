"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetLike = exports.setLike = exports.updateItem = exports.deleteOneItem = exports.getOneItem = exports.getCollectionItems = exports.getTopRatedItems = exports.getItems = exports.createItem = void 0;
const ItemService = require('../services/item.service');
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let item = yield ItemService.create(req.body);
        return res.status(200).json({
            message: 'item was created succesfully',
            data: item,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.createItem = createItem;
const getItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Items = yield ItemService.getAllItems();
        return res.status(200).json({
            message: `Items fetched successfully`,
            data: Items,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.getItems = getItems;
const getTopRatedItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Items = yield ItemService.getTopRatedItems();
        return res.status(200).json({
            message: `Items fetched successfully`,
            data: Items,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.getTopRatedItems = getTopRatedItems;
const getCollectionItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.collectionId;
        const items = yield ItemService.getCollectionItems(id);
        if (typeof items !== 'string') {
            return res.status(200).json({
                message: `Items fetched successfully`,
                data: items,
            });
        }
        else
            return res.status(401).json({
                message: `Items for collection with id:${id} are not found`,
            });
    }
    catch (err) {
        return err.message;
    }
});
exports.getCollectionItems = getCollectionItems;
const getOneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const item = yield ItemService.getOneItem(id);
        if (item) {
            return res.status(200).json({
                message: `item with id:${id} is found`,
                user: item,
            });
        }
        else
            return res.status(200).json({
                message: `item with id:${id} is not found`,
            });
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
});
exports.getOneItem = getOneItem;
const deleteOneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield ItemService.deleteOneItem(id);
        return res.status(200).json({
            message: `item with id:${id} was deleted`,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.deleteOneItem = deleteOneItem;
const updateItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedItem = yield ItemService.updateItem(req.body);
        return res.status(200).json({
            message: `item with id: ${req.body.id} was updated`,
            data: updatedItem,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.updateItem = updateItem;
const setLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let like = yield ItemService.setLike(req.body.userId, req.body.itemId);
        return res.status(200).json({
            message: 'like was created succesfully',
            data: like,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.setLike = setLike;
const unsetLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let like = yield ItemService.unsetLike(req.body);
        return res.status(200).json({
            message: 'like was deleted succesfully',
            data: like,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.unsetLike = unsetLike;
