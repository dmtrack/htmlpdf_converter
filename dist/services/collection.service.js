"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("@sweet-monads/either");
const sequelize_typescript_1 = require("sequelize-typescript");
const collection_1 = require("../db/models/collection");
const item_1 = require("../db/models/item");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
const theme_1 = require("../db/models/theme");
class CollectionService {
    async create(collection) {
        try {
            let { name, description, userId, image, themeId } = collection;
            const created = new Date().getTime();
            const themeName = await theme_1.Theme.findOne({
                where: { id: themeId },
            });
            const response = await collection_1.Collection.create({
                name: name,
                description: description,
                image: image ? image : themeName === null || themeName === void 0 ? void 0 : themeName.defaultImg,
                themeId: themeId,
                themeName: themeName === null || themeName === void 0 ? void 0 : themeName.name,
                userId: userId,
                created: created,
            });
            return (0, either_1.right)(response);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('create collection error', e));
        }
    }
    async getAllCollections() {
        try {
            console.log('request collectio');
            const collections = await collection_1.Collection.findAll();
            console.log('collections', collections);
            return (0, either_1.right)(collections);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('get collections error', e));
        }
    }
    async getThemes() {
        try {
            const themes = await theme_1.Theme.findAll();
            return (0, either_1.right)(themes);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('get themes error', e));
        }
    }
    async getTopAmountOfItemsCollection() {
        try {
            const items = await item_1.Item.findAll({
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
            return (0, either_1.right)(items);
        }
        catch (e) {
            return (0, either_1.left)(new DBError_1.DBError('getTopAmountOfItemsCollection error', e));
        }
    }
    async getOneCollection(id) {
        const collection = await collection_1.Collection.findOne({
            where: { id: id },
        });
        if (!collection) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${id} in data-base`));
        }
        return (0, either_1.right)(collection);
    }
    async getUserCollections(id) {
        const collections = await collection_1.Collection.findAll({
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
    }
    async deleteOneCollection(id) {
        const collection = await collection_1.Collection.destroy({
            where: { id: id },
        });
        if (!collection) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${id} in data-base`));
        }
        return (0, either_1.right)(`collection with id:${id} was deleted`);
    }
    async updateCollection(newData) {
        const collection = await collection_1.Collection.update(Object.assign({}, newData), { where: { id: newData.id } });
        if (collection[0] === 0) {
            return (0, either_1.left)(new EntityError_1.EntityError(`there is no collection with id:${newData.id} in data-base`));
        }
        const updatedCollection = await collection_1.Collection.findByPk(newData.id);
        return (0, either_1.right)(updatedCollection);
    }
}
module.exports = new CollectionService();
