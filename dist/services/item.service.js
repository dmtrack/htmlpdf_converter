'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const item_1 = require('../db/models/item');
const like_1 = require('../db/models/like');
const ApiError = require('../errors/api-error');
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
                return newItem;
            } catch (e) {
                return e.message;
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
                return items;
            } catch (e) {
                return e.message;
            }
        });
    }
    getTopRatedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield like_1.Like.findAll({
                    attributes: [
                        'itemId',
                        [
                            sequelize_1.Sequelize.fn(
                                'count',
                                sequelize_1.Sequelize.col('itemId')
                            ),
                            'count',
                        ],
                    ],
                    include: [
                        {
                            model: item_1.Item,
                            attributes: ['name', 'image'],
                        },
                    ],
                    group: ['Like.itemId', 'name', 'image'],
                    order: sequelize_1.Sequelize.literal('count DESC'),
                    raw: true,
                    nest: true,
                });
                return likes;
            } catch (e) {
                return e.message;
            }
        });
    }
    getOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.findOne({
                where: { id: id },
            });
            if (item) {
                return item_1.Item;
            } else return `Item with id:${id} is not found`;
        });
    }
    getCollectionItems(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield item_1.Item.findAll({
                where: { collectionId: collectionId },
            });
            if (items.length > 0) {
                return items;
            } else return 'no items in this collection';
        });
    }
    deleteOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item_1.Item.destroy({
                where: { id: id },
            });
        });
    }
    updateItem(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item_1.Item.update(Object.assign({}, newData), {
                where: { id: newData.id },
            });
            const updatedItem = yield item_1.Item.findByPk(newData.id);
            return updatedItem;
        });
    }
    setLike(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLike = yield like_1.Like.create({
                itemId: itemId,
                userId: userId,
            });
            return newLike;
        });
    }
    unsetLike(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item_1.Item.destroy({
                where: { itemId: itemId },
            });
        });
    }
}
module.exports = new ItemService();
