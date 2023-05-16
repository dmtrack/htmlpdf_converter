import { RequestHandler } from 'express';
import { ICollection, ItemConfigType } from '../interfaces/models/collection'
import { ITheme } from '../interfaces/models/theme';
const CollectionService = require('../services/collection.service');

export const createCollection: RequestHandler = async (req, res) => {
    console.log(req.body);

    const { collection, itemConfigs } = req.body;
    const response = await CollectionService.create(collection, itemConfigs);

    response
        .mapRight((collection: ICollection) => res.status(200).json(collection))
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getCollections: RequestHandler = async (req, res, next) => {
    const response = await CollectionService.getAllCollections();
    response
        .mapRight((collection: ICollection) => res.status(200).json(collection))
        .mapLeft((e: any) => res.status(401).json(e));
};
export const getThemes: RequestHandler = async (req, res, next) => {
    const response = await CollectionService.getThemes();
    response
        .mapRight((themes: ITheme[]) => res.status(200).json(themes))
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getTopAmountOfItemsCollection: RequestHandler = async (
    req,
    res,
    next
) => {
    const response = await CollectionService.getTopAmountOfItemsCollection();
    response
        .mapRight((collection: ICollection[]) =>
            res.status(200).json(collection)
        )
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getUserCollections: RequestHandler = async (req, res, next) => {
    const id = req.params.userId;
    const response = await CollectionService.getUserCollections(id);
    response
        .mapRight((collections: ICollection[]) =>
            res.status(200).json(collections)
        )
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getOneCollection: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const response = await CollectionService.getOneCollection(id);
    response
        .mapRight((collection: ICollection) => res.status(200).json(collection))
        .mapLeft((e: any) => res.status(401).json(e));
};

export const deleteOneCollection: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    const response = await CollectionService.deleteOneCollection(id);
    response
        .mapRight((response: string) => res.status(200).json(response))
        .mapLeft((e: any) => res.status(401).json(e));
};

export const updateCollection: RequestHandler = async (req, res, next) => {
    const response = await CollectionService.updateCollection(req.body);
    response
        .mapRight((collection: ICollection) => res.status(200).json(collection))
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getItemConfigs: RequestHandler = async (req, res) => {
    const { collectionId } = req.params
    const response = await CollectionService.getItemConfigs(+collectionId)

    response
      .mapRight((configs: ItemConfigType[]) => res.json(configs))
      .mapLeft((e: any) => res.status(500).json(e));
}
