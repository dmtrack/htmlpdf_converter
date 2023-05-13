import { Either, left, right } from '@sweet-monads/either';
import { Sequelize } from 'sequelize';
import { Item } from '../db/models/item';
import { Like } from '../db/models/like';
import { DBError } from '../errors/DBError';
import { EntityError } from '../errors/EntityError';
import { IItemCreate, IItemUpdate } from '../interfaces/models/item';
import { filterItem } from '../utils/item.utils';
import { TagType } from '../interfaces/models/common';
import { createTagsQuery } from './queries/itemQueries';
import { ItemsTags } from '../db/models/ItemsTags';
import { Tag } from '../db/models/tag';

class ItemService {
    async create(item: IItemCreate) {
        try {
            let { userId, collectionId, image, fields, tags } = item;
            if (!image) {
                image =
                    'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultItem.png?raw=true';
            }

            const created = new Date().getTime();
            const newItem = await Item.create({
                collectionId,
                userId,
                created,
                image: image,
                ...fields,
                tags,
            });

            const newTagsResponse = await this.createItemTags(tags, newItem.id);
            return right(
                newTagsResponse.map(
                    (newTags) =>
                        ({ ...filterItem(newItem), tags: newTags } as Item)
                )
            );
        } catch (e: any) {
            return left(new DBError('create item error', e));
        }
    }

    async createItemTags(tags: TagType[], itemId: number) {
        try {
            const addedTags = tags.filter((tag) => tag.id);
            const createdTags = await createTagsQuery(
                tags.filter((tag) => !tag.id)
            );
            const itemTags = [...addedTags, ...createdTags].map((tag) => ({
                itemId,
                tagId: tag.id,
            }));
            await ItemsTags.bulkCreate(itemTags);
            return right([...addedTags, ...createdTags]);
        } catch (e) {
            return left(new DBError('Create item tags error', e));
        }
    }
    async getAllItems() {
        try {
            const items = await Item.findAll({
                include: [{ model: Like }, { model: Tag }],
                order: [['created', 'DESC']],
            });
            console.log(items, 'items');

            return right(items);
        } catch (e: any) {
            console.log(e);

            return left(new DBError('get items error', e));
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
                order: Sequelize.literal('count DESC'),
                raw: true,
                nest: true,
            });

            return right(likes);
        } catch (e: any) {
            console.log(e);

            return left(new DBError('getTopRatedItems error', e));
        }
    }

    async getOneItem(id: number) {
        const item = await Item.findOne({
            where: { id: id },
        });
        if (!item) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(item);
    }

    async getCollectionItems(id: number) {
        const items = await Item.findAll({
            where: { collectionId: id },
        });

        if (items.length === 0) {
            return left(
                new EntityError(
                    `there is no items for collection with id:${id} in data-base`
                )
            );
        }
        return right(items);
    }

    async deleteOneItem(id: number) {
        const item = await Item.destroy({
            where: { id: id },
        });

        if (!item) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(`item with id:${id} was deleted`);
    }

    async updateItem(newData: IItemUpdate) {
        const item = await Item.update(
            { ...newData },
            { where: { id: newData.id } }
        );

        if (item[0] === 0) {
            return left(
                new EntityError(
                    `there is no item with id:${newData.id} in data-base`
                )
            );
        }
        const updatedItem = await Item.findByPk(newData.id);
        return right(updatedItem);
    }

    async setLike(userId: number, itemId: number) {
        try {
            const newLike = await Like.create({
                itemId: itemId,
                userId: userId,
            });
            return right(newLike);
        } catch (e: any) {
            return left(new DBError('create item error', e));
        }
    }

    async unsetLike(id: number) {
        const like = await Item.destroy({
            where: { itemId: id },
        });
        if (!like) {
            return left(
                new EntityError(`there is no item with id:${id} in data-base`)
            );
        }
        return right(`like with id:${id} was deleted`);
    }
}
module.exports = new ItemService();
