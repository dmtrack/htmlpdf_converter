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
exports.createTagsQuery = exports.getMostPopularTagsQuery = exports.getItemWithTagsQuery = exports.getRangeItemsQuery = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const tag_1 = require("../../db/models/tag");
const item_1 = require("../../db/models/item");
const collection_1 = require("../../db/models/collection");
const ItemsTags_1 = require("../../db/models/ItemsTags");
const getRangeItemsQuery = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield item_1.Item.findAll({
        offset: params.offset,
        limit: params.limit,
        include: [
            {
                model: tag_1.Tag,
                through: { attributes: [] },
                where: params.tagIds && params.tagIds.length > 0
                    ? { id: params.tagIds }
                    : undefined,
            },
            {
                model: collection_1.Collection,
                attributes: ['name'],
            },
        ],
        order: [sequelize_typescript_1.Sequelize.literal('timestamp DESC')],
    });
});
exports.getRangeItemsQuery = getRangeItemsQuery;
const getItemWithTagsQuery = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield item_1.Item.findOne({
        where: { id: params.itemId },
        include: {
            model: tag_1.Tag,
            through: { attributes: [] },
        },
    });
});
exports.getItemWithTagsQuery = getItemWithTagsQuery;
const getMostPopularTagsQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    return ItemsTags_1.ItemsTags.findAll({
        limit: 30,
        attributes: [
            'tagId',
            [sequelize_typescript_1.Sequelize.fn('count', sequelize_typescript_1.Sequelize.col('tagId')), 'count'],
        ],
        group: ['ItemsTags.tagId'],
        order: sequelize_typescript_1.Sequelize.literal('count DESC'),
    });
});
exports.getMostPopularTagsQuery = getMostPopularTagsQuery;
const createTagsQuery = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    if (tags.length === 0)
        return [];
    try {
        return yield tag_1.Tag.bulkCreate(tags);
    }
    catch (e) {
        if ((e === null || e === void 0 ? void 0 : e.name) === 'SequelizeUniqueConstraintError') {
            const existTags = yield tag_1.Tag.findAll({
                where: { name: tags.map((tag) => tag.name) },
            });
            const uniqueTags = tags.filter((tag) => !existTags.find((existTag) => existTag.name === tag.name));
            const createdTags = yield tag_1.Tag.bulkCreate(uniqueTags);
            return [...createdTags, ...existTags];
        }
        return [];
    }
});
exports.createTagsQuery = createTagsQuery;
