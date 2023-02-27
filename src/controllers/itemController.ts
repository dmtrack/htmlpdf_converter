import { RequestHandler } from 'express';
import { Item } from '../db/models/item';
import { IItemUpdate } from '../interfaces/models/item';

const ItemService = require('../services/item.service');

export const createItem: RequestHandler = async (req, res, next) => {
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

export const getItems: RequestHandler = async (req, res, next) => {
    try {
        const Items: Item[] = await ItemService.getAllItems();
        return res.status(200).json({
            message: `Items fetched successfully`,
            data: Items,
        });
    } catch (err: any) {
        return err.message;
    }
};
export const getTopRatedItems: RequestHandler = async (req, res, next) => {
    try {
        const Items: Item[] = await ItemService.getTopRatedItems();
        return res.status(200).json({
            message: `Items fetched successfully`,
            data: Items,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const getCollectionItems: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.collectionId;
        const items: Item[] | string = await ItemService.getCollectionItems(id);
        if (typeof items !== 'string') {
            return res.status(200).json({
                message: `Items fetched successfully`,
                data: items,
            });
        } else
            return res.status(401).json({
                message: `Items for collection with id:${id} are not found`,
            });
    } catch (err: any) {
        return err.message;
    }
};

export const getOneItem: RequestHandler = async (req, res, next) => {
    const id = req.params.id;

    try {
        const item: Item = await ItemService.getOneItem(id);

        if (item) {
            return res.status(200).json({
                message: `item with id:${id} is found`,
                user: item,
            });
        } else
            return res.status(200).json({
                message: `item with id:${id} is not found`,
            });
    } catch (err: any) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
};

export const deleteOneItem: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await ItemService.deleteOneItem(id);

        return res.status(200).json({
            message: `item with id:${id} was deleted`,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const updateItem: RequestHandler = async (req, res, next) => {
    try {
        const updatedItem: IItemUpdate = await ItemService.updateItem(req.body);
        return res.status(200).json({
            message: `item with id: ${req.body.id} was updated`,
            data: updatedItem,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const setLike: RequestHandler = async (req, res, next) => {
    try {
        let like = await ItemService.setLike(req.body.userId, req.body.itemId);
        return res.status(200).json({
            message: 'like was created succesfully',
            data: like,
        });
    } catch (err: any) {
        return err.message;
    }
};
export const unsetLike: RequestHandler = async (req, res, next) => {
    try {
        let like = await ItemService.unsetLike(req.body);
        return res.status(200).json({
            message: 'like was deleted succesfully',
            data: like,
        });
    } catch (err: any) {
        return err.message;
    }
};
