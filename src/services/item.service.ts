import { RequestHandler } from 'express';
import { Item } from '../db/models/item';
import { IItem, IItemCreate, IItemUpdate } from '../interfaces/models/item';

const ApiError = require('../exceptions/api-error');

class ItemService {
    async create(item: IItemCreate) {
        try {
            const { name, description, userId, collectionId } = item;
            const created = new Date().getTime();
            const newItem = await Item.create({
                name: name,
                description: description,
                collectionId: collectionId,
                userId: userId,
                created: created,
            });

            return newItem;
        } catch (e: any) {
            return e.message;
        }
    }

    async getAllItems() {
        try {
            const items = await Item.findAll();
            return items;
        } catch (e: any) {
            return e.message;
        }
    }

    async getOneItem(id: number) {
        const item = await Item.findOne({
            where: { id: id },
        });
        if (item) {
            return Item;
        } else return `Item with id:${id} is not found`;
    }

    async getCollectionItems(collectionId: number) {
        const items = await Item.findAll({
            where: { collectionId: collectionId },
        });
        if (items.length > 0) {
            return items;
        } else return 'no items in this collection';
    }

    async deleteOneItem(id: number) {
        await Item.destroy({
            where: { id: id },
        });
    }

    async updateItem(newData: IItemUpdate) {
        await Item.update({ ...newData }, { where: { id: newData.id } });
        const updatedItem = await Item.findByPk(newData.id);
        return updatedItem;
    }
}
module.exports = new ItemService();
