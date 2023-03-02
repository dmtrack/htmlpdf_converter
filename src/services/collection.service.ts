import { RequestHandler } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Collection } from '../db/models/collection';
import { Item } from '../db/models/item';
import {
    ICollection,
    ICollectionCreate,
    ICollectionUpdate,
} from '../interfaces/models/collection';

const ApiError = require('../errors/api-error');
const DataBaseError = require('../errors/db-error');

class CollectionService {
    async create(collection: ICollectionCreate) {
        try {
            const { name, description, userId, image, themeId } = collection;
            const created = new Date().getTime();
            const newCollection = await Collection.create({
                name: name,
                description: description,
                image: image,
                themeId: themeId,
                userId: userId,
                created: created,
            });

            return newCollection;
        } catch (e: any) {
            return e.message;
        }
    }

    async getAllCollections() {
        try {
            const collections = await Collection.findAll();
            return collections;
        } catch (e: any) {
            return e.message;
        }
    }

    async getTopAmountOfItemsCollection() {
        try {
            const items = await Item.findAll({
                attributes: [
                    'collectionId',
                    [
                        Sequelize.fn('count', Sequelize.col('collectionId')),
                        'count',
                    ],
                ],
                include: [
                    {
                        model: Collection,
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
                order: Sequelize.literal('count DESC'),
            });
            return items;
        } catch (e: any) {
            throw DataBaseError.badRequest(e.message, e);
        }
    }

    async getOneCollection(id: number) {
        const collection: ICollection | null = await Collection.findOne({
            where: { id: id },
        });
        if (collection) {
            return collection;
        } else return `collection with id:${id} is not found`;
    }

    async getUserCollections(userId: number) {
        const collections: ICollection[] | null = await Collection.findAll({
            where: { userId: userId },
        });
        if (collections) {
            return collections;
        } else return `collections for user with id:${userId} are not found`;
    }

    async deleteOneCollection(id: number) {
        await Collection.destroy({
            where: { id: id },
        });
    }

    async updateCollection(newData: ICollectionUpdate) {
        await Collection.update({ ...newData }, { where: { id: newData.id } });
        const updatedCollection: ICollectionUpdate | null =
            await Collection.findByPk(newData.id);

        return updatedCollection;
    }
}
module.exports = new CollectionService();
