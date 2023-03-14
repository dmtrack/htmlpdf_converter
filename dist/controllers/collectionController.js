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
exports.updateCollection = exports.deleteOneCollection = exports.getOneCollection = exports.getUserCollections = exports.getTopAmountOfItemsCollection = exports.getCollections = exports.createCollection = void 0;
const CollectionService = require('../services/collection.service');
const createCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CollectionService.create(req.body);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.createCollection = createCollection;
const getCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CollectionService.getAllCollections();
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.getCollections = getCollections;
const getTopAmountOfItemsCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CollectionService.getTopAmountOfItemsCollection();
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.getTopAmountOfItemsCollection = getTopAmountOfItemsCollection;
const getUserCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const response = yield CollectionService.getUserCollections(id);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.getUserCollections = getUserCollections;
const getOneCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield CollectionService.getOneCollection(id);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.getOneCollection = getOneCollection;
const deleteOneCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const response = yield CollectionService.deleteOneCollection(id);
    response
        .mapRight((response) => res.status(200).json(response))
        .mapLeft((e) => res.status(401).json(e));
});
exports.deleteOneCollection = deleteOneCollection;
const updateCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CollectionService.updateCollection(req.body);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
});
exports.updateCollection = updateCollection;
