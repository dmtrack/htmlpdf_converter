import { Sequelize } from 'sequelize';
import { Item } from '../db/models/item';
import { Like } from '../db/models/like';
import { IItemCreate, IItemUpdate } from '../interfaces/models/item';

const ApiError = require('../errors/api-error');

class ItemService {
    async create(item: IItemCreate) {
        try {
            const { name, description, userId, collectionId, image } = item;
            const created = new Date().getTime();
            const newItem = await Item.create({
                name: name,
                description: description,
                collectionId: collectionId,
                userId: userId,
                created: created,
                image: image,
            });
            return newItem;
        } catch (e: any) {
            return e.message;
        }
    }

    async getAllItems() {
        try {
            const items = await Item.findAll({
                include: { model: Like },
                order: [['created', 'DESC']],
            });
            return items;
        } catch (e: any) {
            return e.message;
        }
    }
    async getTopRatedItems() {
        try {
            const likes = await Like.findAll({
                attributes: [
                    'itemId',
                    [Sequelize.fn('count', Sequelize.col('itemId')), 'count'],
                ],
                include: [
                    {
                        model: Item,
                        attributes: ['name', 'image', 'created'],
                    },
                ],
                group: ['Like.itemId', 'name', 'image', 'created'],
                order: Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });
            return likes;
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
    async setLike(userId: number, itemId: number) {
        const newLike = await Like.create({
            itemId: itemId,
            userId: userId,
        });

        return newLike;
    }

    async unsetLike(itemId: number) {
        await Item.destroy({
            where: { itemId: itemId },
        });
    }
}
module.exports = new ItemService();
