import { IItem } from './../interfaces/models/item';
import { RequestHandler } from 'express';

const ItemService = require('../services/item.service');

export const createItemOld: RequestHandler = async (req, res, next) => {
    try {
        let item = await ItemService.create(req.body);
        return res.status(200).json({
            message: 'item was created succesfully',
            data: item,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const createItem: RequestHandler = async (req, res, next) => {
    const response = await ItemService.create(req.body);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getItems: RequestHandler = async (req, res, next) => {
    const response = await ItemService.getAllItems();
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};
export const getTopRatedItems: RequestHandler = async (req, res, next) => {
    const response = await ItemService.getTopRatedItems();
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getCollectionItems: RequestHandler = async (req, res, next) => {
    const id = req.params.collectionId;
    const response = await ItemService.getCollectionItems(id);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};

export const getOneItem: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    const response = await ItemService.getOneItem(id);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};

export const deleteOneItem: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const response = await ItemService.deleteOneItem(id);
    response
        .mapRight((response: string) => {
            res.status(200).json(response);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};

export const updateItem: RequestHandler = async (req, res, next) => {
    const response = await ItemService.updateItem(req.body);
    response
        .mapRight((item: IItem) => {
            res.status(200).json(item);
        })
        .mapLeft((e: any) => res.status(401).json(e));
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
        .mapLeft((e: any) => res.status(401).json(e));
};
export const unsetLike: RequestHandler = async (req, res, next) => {
    const response = await ItemService.unsetLike(req.body);
    response
        .mapRight((response: string) => {
            res.status(200).json(response);
        })
        .mapLeft((e: any) => res.status(401).json(e));
};
