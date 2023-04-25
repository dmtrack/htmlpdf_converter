"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetLike = exports.setLike = exports.updateItem = exports.deleteOneItem = exports.getOneItem = exports.getCollectionItems = exports.getTopRatedItems = exports.getItems = exports.createItem = exports.createItemOld = void 0;
const ItemService = require('../services/item.service');
const createItemOld = async (req, res, next) => {
    try {
        let item = await ItemService.create(req.body);
        return res.status(200).json({
            message: 'item was created succesfully',
            data: item,
        });
    }
    catch (err) {
        return err.message;
    }
};
exports.createItemOld = createItemOld;
const createItem = async (req, res, next) => {
    const response = await ItemService.create(req.body);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.createItem = createItem;
const getItems = async (req, res, next) => {
    const response = await ItemService.getAllItems();
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.getItems = getItems;
const getTopRatedItems = async (req, res, next) => {
    const response = await ItemService.getTopRatedItems();
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.getTopRatedItems = getTopRatedItems;
const getCollectionItems = async (req, res, next) => {
    const id = req.params.collectionId;
    const response = await ItemService.getCollectionItems(id);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.getCollectionItems = getCollectionItems;
const getOneItem = async (req, res, next) => {
    const id = req.params.id;
    const response = await ItemService.getOneItem(id);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.getOneItem = getOneItem;
const deleteOneItem = async (req, res, next) => {
    const id = req.params.id;
    const response = await ItemService.deleteOneItem(id);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.deleteOneItem = deleteOneItem;
const updateItem = async (req, res, next) => {
    const response = await ItemService.updateItem(req.body);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.updateItem = updateItem;
const setLike = async (req, res, next) => {
    const response = await ItemService.setLike(req.body.userId, req.body.itemId);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.setLike = setLike;
const unsetLike = async (req, res, next) => {
    const response = await ItemService.unsetLike(req.body);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
};
exports.unsetLike = unsetLike;
