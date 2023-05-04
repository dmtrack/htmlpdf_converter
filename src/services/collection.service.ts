import { left, right } from '@sweet-monads/either';
import { Sequelize } from 'sequelize-typescript';
import { Collection } from '../db/models/collection';
import { Item } from '../db/models/item';
import { DBError } from '../errors/DBError';
import { EntityError } from '../errors/EntityError';
import {
    ICollection,
    ICollectionCreate,
    ICollectionUpdate,
} from '../interfaces/models/collection';
import { Theme } from '../db/models/theme';

class CollectionService {
    async create(collection: ICollectionCreate) {
        try {
            const { name, description, userId, image, themeId } = collection;
            const created = new Date().getTime();
            const themeName = await Theme.findOne({
                where: { id: themeId },
            });
            const response = await Collection.create({
                name: name,
                description: description,
                image: image,
                themeId: themeId,
                themeName: themeName?.name,
                userId: userId,
                created: created,
            });

            return right(response);
        } catch (e: any) {
            return left(new DBError('create collection error', e));
        }
    }

    async getAllCollections() {
        try {
            const collections = await Collection.findAll();
            return right(collections);
        } catch (e: any) {
            return left(new DBError('get collections error', e));
        }
    }
    async getThemes() {
        try {
            const themes = await Theme.findAll();
            return right(themes);
        } catch (e: any) {
            return left(new DBError('get themes error', e));
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
            return right(items);
        } catch (e: any) {
            return left(new DBError('getTopAmountOfItemsCollection error', e));
        }
    }

    async getOneCollection(id: number) {
        const collection: ICollection | null = await Collection.findOne({
            where: { id: id },
        });
        if (!collection) {
            return left(
                new EntityError(
                    `there is no collection with id:${id} in data-base`
                )
            );
        }
        return right(collection);
    }

    async getUserCollections(id: number) {
        const collections: ICollection[] | null = await Collection.findAll({
            where: { userId: id },
        });

        // if (collections.length === 0) {
        //     return left(
        //         new EntityError(
        //             `there is no collections for user with id:${id} in data-base`
        //         )
        //     );
        // }
        return right(collections);
    }

    async deleteOneCollection(id: number) {
        const collection = await Collection.destroy({
            where: { id: id },
        });
        if (!collection) {
            return left(
                new EntityError(
                    `there is no collection with id:${id} in data-base`
                )
            );
        }
        return right(`collection with id:${id} was deleted`);
    }

    async updateCollection(newData: ICollectionUpdate) {
        const collection = await Collection.update(
            { ...newData },
            { where: { id: newData.id } }
        );

        if (collection[0] === 0) {
            return left(
                new EntityError(
                    `there is no collection with id:${newData.id} in data-base`
                )
            );
        }
        const updatedCollection = await Collection.findByPk(newData.id);
        return right(updatedCollection);
    }
}
module.exports = new CollectionService();
