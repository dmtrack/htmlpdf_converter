"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("@sweet-monads/either");
const sequelize_1 = require("sequelize");
const item_1 = require("../db/models/item");
const like_1 = require("../db/models/like");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
class ItemService {
    async create(item) {
        try {
            const { name, description, userId, collectionId, image } = item;
            const created = new Date().getTime();
            const newItem = await item_1.Item.create({
                name: name,
                description: description,
                collectionId: collectionId,
                userId: userId,
                created: created,
                image: image,
            });
            return (0, either_1.right)(newItem);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('create item error', e));
        }
    }
    async getAllItems() {
        try {
            const items = await item_1.Item.findAll({
                include: { model: like_1.Like },
                order: [['created', 'DESC']],
            });
            return (0, either_1.right)(items);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('get items error', e));
        }
    }
    async getTopRatedItems() {
        try {
            const likes = await like_1.Like.findAll({
                attributes: [
                    'itemId',
                    [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('itemId')), 'count'],
                ],
                include: [
                    {
                        model: item_1.Item,
                        attributes: [
                            'name',
                            'image',
                            'created',
                            'collectionId',
                        ],
                    },
                ],
                group: [
                    'Like.itemId',
                    'name',
                    'image',
                    'created',
                    'collectionId',
                ],
                order: sequelize_1.Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });
            return (0, either_1.right)(likes);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('getTopRatedItems error', e));
        }
    }
    async getOneItem(id) {
        const item = await item_1.Item.findOne({
            where: { id: id },
        });
        if (!item) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
        }
        return (0, either_1.right)(item);
    }
    async getCollectionItems(id) {
        const items = await item_1.Item.findAll({
            where: { collectionId: id },
        });
        console.log('items', items);
        if (items.length === 0) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no items for collection with id:${id} in data-base`));
        }
        return (0, either_1.right)(items);
    }
    async deleteOneItem(id) {
        const item = await item_1.Item.destroy({
            where: { id: id },
        });
        if (!item) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
        }
        return (0, either_1.right)(`item with id:${id} was deleted`);
    }
    async updateItem(newData) {
        const item = await item_1.Item.update(Object.assign({}, newData), { where: { id: newData.id } });
        if (item[0] === 0) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${newData.id} in data-base`));
        }
        const updatedItem = await item_1.Item.findByPk(newData.id);
        return (0, either_1.right)(updatedItem);
    }
    async setLike(userId, itemId) {
        try {
            const newLike = await like_1.Like.create({
                itemId: itemId,
                userId: userId,
            });
            return (0, either_1.right)(newLike);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('create item error', e));
        }
    }
    async unsetLike(id) {
        const like = await item_1.Item.destroy({
            where: { itemId: id },
        });
        if (!like) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
        }
        return (0, either_1.right)(`like with id:${id} was deleted`);
    }
}
module.exports = new ItemService();
