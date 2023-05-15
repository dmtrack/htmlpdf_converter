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
exports.handleGetMostPopularTags = exports.getTags = exports.unsetLike = exports.setLike = exports.updateItem = exports.deleteOneItem = exports.getOneItem = exports.getCollectionItems = exports.getTopCommentedItems = exports.getTopRatedItems = exports.getItems = exports.createItem = void 0;
const tag_1 = require("../db/models/tag");
const DBError_1 = require("../errors/DBError");
const ItemService = require('../services/item.service');
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.create(req.body);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.createItem = createItem;
const getItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.getAllItems();
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.getItems = getItems;
const getTopRatedItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.getTopRatedItems();
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.getTopRatedItems = getTopRatedItems;
const getTopCommentedItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.getTopCommentedItems();
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.getTopCommentedItems = getTopCommentedItems;
const getCollectionItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.collectionId;
    const response = yield ItemService.getCollectionItems(id);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.getCollectionItems = getCollectionItems;
const getOneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield ItemService.getOneItem(id);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.getOneItem = getOneItem;
const deleteOneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield ItemService.deleteOneItem(id);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.deleteOneItem = deleteOneItem;
const updateItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.updateItem(req.body);
    response
        .mapRight((item) => {
        res.status(200).json(item);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.updateItem = updateItem;
const setLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.setLike(req.body.userId, req.body.itemId);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.setLike = setLike;
const unsetLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.unsetLike(req.body);
    response
        .mapRight((response) => {
        res.status(200).json(response);
    })
        .mapLeft((e) => res.status(401).json(e));
});
exports.unsetLike = unsetLike;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield tag_1.Tag.findAll());
    }
    catch (e) {
        res.status(500).json(new DBError_1.DBError('Get tags error', e));
    }
});
exports.getTags = getTags;
const handleGetMostPopularTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ItemService.getMostPopularTags();
    response
        .mapRight((r) => res.json(r))
        .mapLeft((e) => res.status(500).json(e));
});
exports.handleGetMostPopularTags = handleGetMostPopularTags;
