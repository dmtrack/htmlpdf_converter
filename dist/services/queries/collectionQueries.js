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
exports.cascadeDeleteItemConfigs = exports.getFullCollectionDataQuery = exports.getCollectionsByItemCountQuery = void 0;
const sequelize_1 = require("sequelize");
const item_1 = require("../../db/models/item");
const collection_1 = require("../../db/models/collection");
const user_1 = require("../../db/models/user");
const ItemConfigs_1 = require("../../db/models/ItemConfigs");
const tag_1 = require("../../db/models/tag");
const getCollectionsByItemCountQuery = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield item_1.Item.findAll({
        offset: params.offset,
        limit: params.limit,
        attributes: [
            [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('collectionId')), 'count'],
        ],
        include: [
            {
                model: collection_1.Collection,
                where: params.themeId ? { themeId: params.themeId } : undefined,
                attributes: [
                    'title',
                    'description',
                    'themeId',
                    'imageUrl',
                    'timestamp',
                    'id',
                ],
                include: [{ model: user_1.User, attributes: ['name'] }],
            },
        ],
        group: ['Items.collectionId', 'collections.id', 'collections.user.id'],
        order: sequelize_1.Sequelize.literal('count DESC'),
    });
});
exports.getCollectionsByItemCountQuery = getCollectionsByItemCountQuery;
const getFullCollectionDataQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection_1.Collection.findOne({
        where: { id },
        include: [
            { model: ItemConfigs_1.ItemConfigs },
            { model: user_1.User },
            {
                model: item_1.Item,
                include: [{ model: tag_1.Tag, through: { attributes: [] } }],
            },
        ],
    });
});
exports.getFullCollectionDataQuery = getFullCollectionDataQuery;
const cascadeDeleteItemConfigs = (removedConfigs) => __awaiter(void 0, void 0, void 0, function* () {
    if (removedConfigs.length === 0)
        return;
    const configIds = removedConfigs.map((config) => config.id);
    const removedItemFields = {};
    removedConfigs.forEach((config) => {
        removedItemFields[config.type] = null;
    });
    yield ItemConfigs_1.ItemConfigs.destroy({ where: { id: configIds } });
    yield item_1.Item.update(removedItemFields, {
        where: { collectionId: removedConfigs[0].collectionId },
    });
});
exports.cascadeDeleteItemConfigs = cascadeDeleteItemConfigs;
