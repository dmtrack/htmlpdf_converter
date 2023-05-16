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
const sequelize_typescript_1 = require("sequelize-typescript");
const collection_1 = require("../db/models/collection");
const item_1 = require("../db/models/item");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
const theme_1 = require("../db/models/theme");
const search_service_1 = require("./search.service");
const ItemConfigs_1 = require("../db/models/ItemConfigs");
class CollectionService {
    create(collection, itemConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, description, userId, image, themeId } = collection;
                const created = new Date().getTime();
                const themeName = yield theme_1.Theme.findOne({
                    where: { id: themeId },
                });
                const response = yield collection_1.Collection.create({
                    name: name,
                    description: description,
                    image: image ? image : themeName === null || themeName === void 0 ? void 0 : themeName.defaultImg,
                    themeId: themeId,
                    themeName: themeName === null || themeName === void 0 ? void 0 : themeName.name,
                    userId: userId,
                    created: created,
                });
                if (itemConfigs && itemConfigs.length > 0) {
                    const configs = itemConfigs.map((config) => (Object.assign(Object.assign({}, config), { collectionId: +response.id })));
                    console.log(configs, 'CONFIGS');
                    yield ItemConfigs_1.ItemConfigs.bulkCreate(configs);
                }
                return (0, either_1.right)(response);
            }
            catch (e) {
                console.log(e, 'error');
                return (0, either_1.left)(new DBError_1.DBError('create collection error', e));
            }
        });
    }
    edit(collection, itemConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield collection_1.Collection.update(collection, { where: { id: collection.id }, returning: ['*'] });
                yield ItemConfigs_1.ItemConfigs.destroy({ where: { collectionId: collection.id } });
                if (itemConfigs && itemConfigs.length > 0) {
                    const configs = itemConfigs.map((config) => (Object.assign(Object.assign({}, config), { collectionId: response[1][0].id })));
                    console.log(configs, 'CONFIGS');
                    yield ItemConfigs_1.ItemConfigs.bulkCreate(configs);
                }
                return (0, either_1.right)(response[1][0]);
            }
            catch (error) {
                console.log(error, 'error');
                return (0, either_1.left)(new DBError_1.DBError('create collection error', error));
            }
        });
    }
    getAllCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = yield collection_1.Collection.findAll();
                return (0, either_1.right)(collections);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('get collections error', e));
            }
        });
    }
    getThemes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const themes = yield theme_1.Theme.findAll();
                return (0, either_1.right)(themes);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('get themes error', e));
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
                    order: sequelize_typescript_1.Sequelize.literal('count ASC'),
                });
                return (0, either_1.right)(items);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('getTopAmountOfItemsCollection error', e));
            }
        });
    }
    getOneCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield collection_1.Collection.findOne({
                where: { id: id },
            });
            if (!collection) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${id} in data-base`));
            }
            return (0, either_1.right)(collection);
        });
    }
    getUserCollections(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield collection_1.Collection.findAll({
                where: { userId: id },
            });
            // if (collections.length === 0) {
            //     return left(
            //         new EntityError(
            //             `there is no collections for user with id:${id} in data-base`
            //         )
            //     );
            // }
            return (0, either_1.right)(collections);
        });
    }
    deleteOneCollection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, search_service_1.removeCollectionRelationshipIndexes)(id);
            const collection = yield collection_1.Collection.destroy({
                where: { id: id },
            });
            if (!collection) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${id} in data-base`));
            }
            return (0, either_1.right)(`collection with id:${id} was deleted`);
        });
    }
    updateCollection(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield collection_1.Collection.update(Object.assign({}, newData), { where: { id: newData.id } });
            if (collection[0] === 0) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${newData.id} in data-base`));
            }
            const updatedCollection = yield collection_1.Collection.findByPk(newData.id);
            return (0, either_1.right)(updatedCollection);
        });
    }
    getItemConfigs(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemConfigs = yield ItemConfigs_1.ItemConfigs.findAll({ where: { collectionId } });
                return (0, either_1.right)(itemConfigs);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('get item configs error', e));
            }
        });
    }
}
module.exports = new CollectionService();
