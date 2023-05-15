import { ItemConfigType } from '../../interfaces/models/collection';
import { Sequelize } from 'sequelize';
import { Item } from '../../db/models/item';
import { Collection } from '../../db/models/collection';
import { User } from '../../db/models/user';
import { ItemConfigs } from '../../db/models/ItemConfigs';
import { Tag } from '../../db/models/tag';

export const getCollectionsByItemCountQuery = async (params: {
    offset?: number;
    limit?: number;
    themeId: number;
}) => {
    return await Item.findAll({
        offset: params.offset,
        limit: params.limit,
        attributes: [
            [Sequelize.fn('count', Sequelize.col('collectionId')), 'count'],
        ],
        include: [
            {
                model: Collection,
                where: params.themeId ? { themeId: params.themeId } : undefined,
                attributes: [
                    'title',
                    'description',
                    'themeId',
                    'imageUrl',
                    'timestamp',
                    'id',
                ],
                include: [{ model: User, attributes: ['name'] }],
            },
        ],
        group: ['Items.collectionId', 'collections.id', 'collections.user.id'],
        order: Sequelize.literal('count DESC'),
    });
};

export const getFullCollectionDataQuery = async (id: number) => {
    return await Collection.findOne({
        where: { id },
        include: [
            { model: ItemConfigs },
            { model: User },
            {
                model: Item,
                include: [{ model: Tag, through: { attributes: [] } }],
            },
        ],
    });
};

export const cascadeDeleteItemConfigs = async (
    removedConfigs: ItemConfigType[]
) => {
    if (removedConfigs.length === 0) return;
    const configIds = removedConfigs.map((config) => config.id);
    const removedItemFields: { [key: string]: null } = {};
    removedConfigs.forEach((config) => {
        removedItemFields[config.type] = null;
    });
    await ItemConfigs.destroy({ where: { id: configIds } });
    await Item.update(removedItemFields, {
        where: { collectionId: removedConfigs[0].collectionId },
    });
};
