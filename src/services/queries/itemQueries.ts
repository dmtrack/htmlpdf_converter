import { Sequelize } from 'sequelize-typescript';
import { Tag } from '../../db/models/tag';
import { Item } from '../../db/models/item';
import { Collection } from '../../db/models/collection';
import { ItemsTags } from '../../db/models/ItemsTags';
import { TagType } from '../../interfaces/models/common';

export const getRangeItemsQuery = async (params: {
    offset: number;
    limit: number;
    tagIds?: number[];
}) => {
    return await Item.findAll({
        offset: params.offset,
        limit: params.limit,
        include: [
            {
                model: Tag,
                through: { attributes: [] },
                where:
                    params.tagIds && params.tagIds.length > 0
                        ? { id: params.tagIds }
                        : undefined,
            },
            {
                model: Collection,
                attributes: ['name'],
            },
        ],
        order: [Sequelize.literal('timestamp DESC')],
    });
};

export const getItemWithTagsQuery = async (params: { itemId: number }) => {
    return await Item.findOne({
        where: { id: params.itemId },
        include: {
            model: Tag,
            through: { attributes: [] },
        },
    });
};

export const getMostPopularTagsQuery = async () => {
    return ItemsTags.findAll({
        limit: 30,
        attributes: [
            'tagId',
            [Sequelize.fn('count', Sequelize.col('tagId')), 'count'],
        ],
        group: ['ItemsTags.tagId'],
        order: Sequelize.literal('count DESC'),
    });
};

export const createTagsQuery = async (tags: TagType[]) => {
    if (tags.length === 0) return [];
    try {
        return await Tag.bulkCreate(tags);
    } catch (e: any) {
        if (e?.name === 'SequelizeUniqueConstraintError') {
            const existTags = await Tag.findAll({
                where: { name: tags.map((tag) => tag.name) },
            });
            const uniqueTags = tags.filter(
                (tag) =>
                    !existTags.find((existTag) => existTag.name === tag.name)
            );
            const createdTags = await Tag.bulkCreate(uniqueTags);
            return [...createdTags, ...existTags];
        }
        return [];
    }
};
