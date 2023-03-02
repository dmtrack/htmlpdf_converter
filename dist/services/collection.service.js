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
const sequelize_typescript_1 = require("sequelize-typescript");
const collection_1 = require("../db/models/collection");
const item_1 = require("../db/models/item");
const ApiError = require('../errors/api-error');
const DataBaseError = require('../errors/db-error');
class CollectionService {
    create(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, userId, image, themeId } = collection;
                const created = new Date().getTime();
                const newCollection = yield collection_1.Collection.create({
                    name: name,
                    description: description,
                    image: image,
                    themeId: themeId,
                    userId: userId,
                    created: created,
                });
                return newCollection;
            }
            catch (e) {
                return e.message;
            }
        });
    }
    getAllCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = yield collection_1.Collection.findAll();
                return collections;
            }
            catch (e) {
                return e.message;
            }
        });
    }
    getTopAmountOfItemsCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield item_1.Item.findAll({
                    attributes: [
                        'collectionId',
                        [
                            sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('collectionId')),
                            'count',
                        ],
                    ],
                    include: [
                        {
                            model: collection_1.Collection,
                            attributes: [
                                'name',
                                'image',
                                'themeId',
                                'created',
                                'id',
                            ],
                        },
                    ],
                    group: ['Item.collectionId', 'collection.id'],
                    order: sequelize_typescript_1.Sequelize.literal('count DESC'),
                });
                return items;
            }
            catch (e) {
                throw DataBaseError.badRequest(e.message, e);
            }
        });
    }
    getOneCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield collection_1.Collection.findOne({
                where: { id: id },
            });
            if (collection) {
                return collection;
            }
            else
                return `collection with id:${id} is not found`;
        });
    }
    getUserCollections(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield collection_1.Collection.findAll({
                where: { userId: userId },
            });
            if (collections) {
                return collections;
            }
            else
                return `collections for user with id:${userId} are not found`;
        });
    }
    deleteOneCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield collection_1.Collection.destroy({
                where: { id: id },
            });
        });
    }
    updateCollection(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield collection_1.Collection.update(Object.assign({}, newData), { where: { id: newData.id } });
            const updatedCollection = yield collection_1.Collection.findByPk(newData.id);
            return updatedCollection;
        });
    }
}
module.exports = new CollectionService();
