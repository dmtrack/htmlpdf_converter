import { RequestHandler } from 'express';
import { Collection } from '../db/models/collection';
import {
    ICollection,
    ICollectionCreate,
    ICollectionUpdate,
} from '../interfaces/models/collection';

const ApiError = require('../exceptions/api-error');

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
