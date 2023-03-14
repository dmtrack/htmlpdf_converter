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
const either_1 = require("@sweet-monads/either");
const sequelize_1 = require("sequelize");
const item_1 = require("../db/models/item");
const like_1 = require("../db/models/like");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
class ItemService {
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, userId, collectionId, image } = item;
                const created = new Date().getTime();
                const newItem = yield item_1.Item.create({
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
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield item_1.Item.findAll({
                    include: { model: like_1.Like },
                    order: [['created', 'DESC']],
                });
                return (0, either_1.right)(items);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('get items error', e));
            }
        });
    }
    getTopRatedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield like_1.Like.findAll({
                    attributes: [
                        'itemId',
                        [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('itemId')), 'count'],
                    ],
                    include: [
                        {
                            model: item_1.Item,
                            attributes: ['name', 'image', 'created'],
                        },
                    ],
                    group: ['Like.itemId', 'name', 'image', 'created'],
                    order: sequelize_1.Sequelize.literal('count DESC'),
                    raw: true,
                    nest: true,
                });
                return (0, either_1.right)(likes);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('getTopRatedItems error', e));
            }
        });
    }
    getOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.findOne({
                where: { id: id },
            });
            if (!item) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(item);
        });
    }
    getCollectionItems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield item_1.Item.findAll({
                where: { collectionId: id },
            });
            console.log('items', items);
            if (items.length === 0) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no items for collection with id:${id} in data-base`));
            }
            return (0, either_1.right)(items);
        });
    }
    deleteOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.destroy({
                where: { id: id },
            });
            if (!item) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(`item with id:${id} was deleted`);
        });
    }
    updateItem(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.update(Object.assign({}, newData), { where: { id: newData.id } });
            console.log('itemUpd', item);
            if (item[0] === 0) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${newData.id} in data-base`));
            }
            const updatedItem = yield item_1.Item.findByPk(newData.id);
            return (0, either_1.right)(updatedItem);
        });
    }
    setLike(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLike = yield like_1.Like.create({
                    itemId: itemId,
                    userId: userId,
                });
                return (0, either_1.right)(newLike);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('create item error', e));
            }
        });
    }
    unsetLike(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield item_1.Item.destroy({
                where: { itemId: id },
            });
            if (!like) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(`like with id:${id} was deleted`);
        });
    }
}
module.exports = new ItemService();
