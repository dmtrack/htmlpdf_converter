"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollection = exports.deleteOneCollection = exports.getOneCollection = exports.getUserCollections = exports.getTopAmountOfItemsCollection = exports.getCollections = exports.createCollection = void 0;
const CollectionService = require('../services/collection.service');
const createCollection = async (req, res, next) => {
    const response = await CollectionService.create(req.body);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.createCollection = createCollection;
const getCollections = async (req, res, next) => {
    const response = await CollectionService.getAllCollections();
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.getCollections = getCollections;
const getTopAmountOfItemsCollection = async (req, res, next) => {
    const response = await CollectionService.getTopAmountOfItemsCollection();
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.getTopAmountOfItemsCollection = getTopAmountOfItemsCollection;
const getUserCollections = async (req, res, next) => {
    const id = req.params.userId;
    const response = await CollectionService.getUserCollections(id);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.getUserCollections = getUserCollections;
const getOneCollection = async (req, res, next) => {
    const id = req.params.id;
    const response = await CollectionService.getOneCollection(id);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.getOneCollection = getOneCollection;
const deleteOneCollection = async (req, res, next) => {
    const id = req.params.id;
    const response = await CollectionService.deleteOneCollection(id);
    response
        .mapRight((response) => res.status(200).json(response))
        .mapLeft((e) => res.status(401).json(e));
};
exports.deleteOneCollection = deleteOneCollection;
const updateCollection = async (req, res, next) => {
    const response = await CollectionService.updateCollection(req.body);
    response
        .mapRight((collection) => res.status(200).json(collection))
        .mapLeft((e) => res.status(401).json(e));
};
exports.updateCollection = updateCollection;
