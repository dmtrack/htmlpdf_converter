import { Tag } from '../db/models/tag';
import { DBError } from '../errors/DBError';
import { IItem } from './../interfaces/models/item';
import { RequestHandler } from 'express';

const ItemService = require('../services/item.service');

export const createItem: RequestHandler = async (req, res, next) => {
    const response = await ItemService.create(req.body);

    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const getItems: RequestHandler = async (req, res, next) => {
    const response = await ItemService.getAllItems();
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};
export const getTopRatedItems: RequestHandler = async (req, res, next) => {
    const response = await ItemService.getTopRatedItems();

    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const getTopCommentedItems: RequestHandler = async (req, res, next) => {
    const response = await ItemService.getTopCommentedItems();

    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const getCollectionItems: RequestHandler = async (req, res, next) => {
    const id = req.params.collectionId;
    const response = await ItemService.getCollectionItems(id);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const getOneItem: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    const response = await ItemService.getOneItem(id);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const deleteOneItem: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const response = await ItemService.deleteOneItem(id);
    response
        .mapRight((response: string) => {
            res.status(200).json(response);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const updateItem: RequestHandler = async (req, res, next) => {
    const response = await ItemService.updateItem(req.body);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const setLike: RequestHandler = async (req, res, next) => {
    const response = await ItemService.setLike(
        req.body.userId,
        req.body.itemId
    );
    response
        .mapRight((response: string) => {
            res.status(200).json(response);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};
export const unsetLike: RequestHandler = async (req, res, next) => {
    const response = await ItemService.unsetLike(req.body);
    response
        .mapRight((response: string) => {
            res.status(200).json(response);
        })
        .mapLeft((e: any) => res.status(500).json(e));
};

export const getTags: RequestHandler = async (req, res) => {
    try {
        res.json(await Tag.findAll());
    } catch (e) {
        res.status(500).json(new DBError('Get tags error', e));
    }
};

export const handleGetMostPopularTags: RequestHandler = async (req, res) => {
    const response = await ItemService.getMostPopularTags();

    response
        .mapRight((r: any) => res.json(r))
        .mapLeft((e: any) => res.status(500).json(e));
};
