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
const sequelize_1 = require("sequelize");
const item_1 = require("../db/models/item");
const like_1 = require("../db/models/like");
const comment_1 = require("../db/models/comment");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
const item_utils_1 = require("../utils/item.utils");
const itemQueries_1 = require("./queries/itemQueries");
const ItemsTags_1 = require("../db/models/ItemsTags");
const tag_1 = require("../db/models/tag");
const search_service_1 = require("./search.service");
class ItemService {
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId, collectionId, image, fields, tags } = item;
                if (!image) {
                    image =
                        'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultItemImage.png?raw=true';
                }
                const created = new Date().getTime();
                const newItem = yield item_1.Item.create(Object.assign(Object.assign({ collectionId,
                    userId,
                    created, image: image }, fields), { tags }));
                const newTagsResponse = yield this.createItemTags(tags, newItem.id);
                return (0, either_1.right)(newTagsResponse.map((newTags) => (Object.assign(Object.assign({}, (0, item_utils_1.filterItem)(newItem)), { tags: newTags }))));
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('create item error', e));
            }
        });
    }
    createItemTags(tags, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedTags = tags.filter((tag) => tag.id);
                const createdTags = yield (0, itemQueries_1.createTagsQuery)(tags.filter((tag) => !tag.id));
                const itemTags = [...addedTags, ...createdTags].map((tag) => ({
                    itemId,
                    tagId: tag.id,
                }));
                yield ItemsTags_1.ItemsTags.bulkCreate(itemTags);
                return (0, either_1.right)([...addedTags, ...createdTags]);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('Create item tags error', e));
            }
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield item_1.Item.findAll({
                    include: [{ model: like_1.Like }, { model: tag_1.Tag }],
                    order: [['created', 'DESC']],
                });
                console.log(items, 'items');
                return (0, either_1.right)(items);
            }
            catch (e) {
                console.log(e);
                return (0, either_1.left)(new DBError_1.DBError('get items error', e));
            }
        });
    }
    getTopRatedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield like_1.Like.findAll({
                    attributes: [
                        'itemId',
                        [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('itemId')), 'count'],
                    ],
                    include: [
                        {
                            model: item_1.Item,
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
                    order: sequelize_1.Sequelize.literal('count DESC'),
                    raw: true,
                    nest: true,
                });
                return (0, either_1.right)(likes);
            }
            catch (e) {
                console.log(e);
                return (0, either_1.left)(new DBError_1.DBError('getTopRatedItems error', e));
            }
        });
    }
    getTopCommentedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_1.Comment.findAll({
                    attributes: [
                        'itemId',
                        [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('itemId')), 'count'],
                    ],
                    include: [
                        {
                            model: item_1.Item,
                            attributes: [
                                'name',
                                'image',
                                'created',
                                'collectionId',
                            ],
                        },
                    ],
                    group: [
                        'Comment.itemId',
                        'name',
                        'image',
                        'created',
                        'collectionId',
                    ],
                    order: sequelize_1.Sequelize.literal('count DESC'),
                    raw: true,
                    nest: true,
                });
                return (0, either_1.right)(comments);
            }
            catch (e) {
                console.log(e);
                return (0, either_1.left)(new DBError_1.DBError('getTopComments error', e));
            }
        });
    }
    getOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.findOne({
                where: { id: id },
            });
            if (!item) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(item);
        });
    }
    getCollectionItems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield item_1.Item.findAll({
                where: { collectionId: id },
            });
            if (items.length === 0) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no items for collection with id:${id} in data-base`));
            }
            return (0, either_1.right)(items);
        });
    }
    deleteOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, search_service_1.removeItemCommentsIndexes)(id);
            const item = yield item_1.Item.destroy({
                where: { id: id },
            });
            if (!item) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(`item with id:${id} was deleted`);
        });
    }
    updateItem(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield item_1.Item.update(Object.assign({}, newData), { where: { id: newData.id } });
            if (item[0] === 0) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${newData.id} in data-base`));
            }
            const updatedItem = yield item_1.Item.findByPk(newData.id);
            return (0, either_1.right)(updatedItem);
        });
    }
    setLike(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLike = yield like_1.Like.create({
                    itemId: itemId,
                    userId: userId,
                });
                return (0, either_1.right)(newLike);
            }
            catch (e) {
                return (0, either_1.left)(new DBError_1.DBError('create item error', e));
            }
        });
    }
    unsetLike(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield item_1.Item.destroy({
                where: { itemId: id },
            });
            if (!like) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no item with id:${id} in data-base`));
            }
            return (0, either_1.right)(`like with id:${id} was deleted`);
        });
    }
    getMostPopularTags() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countTags = (yield (0, itemQueries_1.getMostPopularTagsQuery)()).map((countTag) => ({
                    tagId: countTag.tagId,
                    count: +countTag.dataValues.count,
                }));
                return (0, either_1.right)(countTags);
            }
            catch (e) {
                console.log(e);
                return (0, either_1.left)(new DBError_1.DBError('getMostPopularTags: Error', e));
            }
        });
    }
}
module.exports = new ItemService();
