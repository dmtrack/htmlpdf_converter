"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexingAllCollections = exports.indexingAllComments = exports.indexingAllItems = exports.removeCollectionRelationshipIndexes = exports.removeCollectionIndex = exports.uploadCollectionIndex = exports.addCollectionIndex = exports.removeItemCommentsIndexes = exports.removeCommentIndex = exports.addCommentIndex = exports.removeItemIndex = exports.uploadItemIndex = exports.addItemIndex = void 0;
const item_1 = require("../db/models/item");
const item_utils_1 = require("../utils/item.utils");
const comment_1 = require("../db/models/comment");
const either_1 = require("@sweet-monads/either");
const indexError_1 = require("../errors/indexError");
const meilisearch_1 = require("../api/meilisearch");
const ItemService = require('./item.service');
const CollectionService = require('./collection.service');
const CommentService = require('./comment.service');
const addItemIndex = (item) => {
    const index = new meilisearch_1.SearchClient().index('items');
    index
        .addDocuments([(0, item_utils_1.filterItem)(item)])
        .catch((e) => console.log('CREATE_INDEX_ERROR', e));
};
exports.addItemIndex = addItemIndex;
const uploadItemIndex = (item) => {
    const index = new meilisearch_1.SearchClient().index('items');
    index
        .updateDocuments([item])
        .catch((e) => console.log('UPLOAD_INDEX_ERROR', e));
};
exports.uploadItemIndex = uploadItemIndex;
const removeItemIndex = (itemId) => {
    const index = new meilisearch_1.SearchClient().index('items');
    index
        .deleteDocument(itemId)
        .catch((e) => console.log('DELETE_INDEX_ERROR', e));
};
exports.removeItemIndex = removeItemIndex;
const addCommentIndex = (comment) => {
    const index = new meilisearch_1.SearchClient().index('comments');
    index
        .addDocuments([comment.dataValues])
        .catch((e) => console.log('CREATE_INDEX_ERROR', e));
};
exports.addCommentIndex = addCommentIndex;
const removeCommentIndex = (commentId) => {
    const index = new meilisearch_1.SearchClient().index('comments');
    index
        .deleteDocument(commentId)
        .catch((e) => console.log('DELETE_INDEX_ERROR', e));
};
exports.removeCommentIndex = removeCommentIndex;
const removeItemCommentsIndexes = async (itemId) => {
    const index = new meilisearch_1.SearchClient().index('comments');
    const itemCommentIds = (await comment_1.Comment.findAll({ where: { itemId } })).map((comment) => comment.id);
    index
        .deleteDocuments(itemCommentIds)
        .catch((e) => console.log('DELETE_INDEXES_ERROR', e));
};
exports.removeItemCommentsIndexes = removeItemCommentsIndexes;
const addCollectionIndex = (collection) => {
    const index = new meilisearch_1.SearchClient().index('collections');
    index
        .addDocuments([collection.dataValues])
        .catch((e) => console.log('CREATE_INDEX_ERROR', e));
};
exports.addCollectionIndex = addCollectionIndex;
const uploadCollectionIndex = (collection) => {
    const index = new meilisearch_1.SearchClient().index('collections');
    index
        .updateDocuments([collection])
        .catch((e) => console.log('UPLOAD_INDEX_ERROR', e));
};
exports.uploadCollectionIndex = uploadCollectionIndex;
const removeCollectionIndex = (collectionId) => {
    const index = new meilisearch_1.SearchClient().index('collections');
    index
        .deleteDocument(collectionId)
        .catch((e) => console.log('DELETE_INDEX_ERROR', e));
};
exports.removeCollectionIndex = removeCollectionIndex;
const removeCollectionRelationshipIndexes = async (collectionId) => {
    const client = new meilisearch_1.SearchClient();
    const itemIndex = client.index('items');
    const commentIndex = client.index('comments');
    const itemIds = (await item_1.Item.findAll({ where: { collectionId } })).map((item) => item.id);
    const commentIds = (await comment_1.Comment.findAll({ where: { itemId: itemIds } })).map((comment) => comment.id);
    itemIndex
        .deleteDocuments(itemIds)
        .catch((e) => console.log('DELETE_INDEXES_ERROR', e));
    commentIndex
        .deleteDocuments(commentIds)
        .catch((e) => console.log('DELETE_INDEXES_ERROR', e));
};
exports.removeCollectionRelationshipIndexes = removeCollectionRelationshipIndexes;
const indexingAllItems = async () => {
    try {
        const index = new meilisearch_1.SearchClient().index('items');
        await index.deleteAllDocuments();
        return (await ItemService.getAllItems())
            .mapLeft((e) => new indexError_1.IndexError('Get items error', e))
            .asyncMap(async (items) => {
            const response = await index.addDocuments(items.map((item) => (0, item_utils_1.filterItem)(item)));
            return { status: response.status };
        });
    }
    catch (e) {
        return (0, either_1.left)(new indexError_1.IndexError('Indexing all items error', e));
    }
};
exports.indexingAllItems = indexingAllItems;
const indexingAllComments = async () => {
    try {
        const index = new meilisearch_1.SearchClient().index('comments');
        await index.deleteAllDocuments();
        return (await CommentService.getAllComments())
            .mapLeft((e) => new indexError_1.IndexError('Get comments error', e))
            .asyncMap(async (comments) => {
            const response = await index.addDocuments(comments);
            return { status: response.status };
        });
    }
    catch (e) {
        return (0, either_1.left)(new indexError_1.IndexError('Indexing all comments error', e));
    }
};
exports.indexingAllComments = indexingAllComments;
const indexingAllCollections = async () => {
    try {
        const index = new meilisearch_1.SearchClient().index('collections');
        await index.deleteAllDocuments();
        return (await CollectionService.getAllCollections())
            .mapLeft((e) => new indexError_1.IndexError('Get collections error', e))
            .asyncMap(async (collections) => {
            const response = await index.addDocuments(collections);
            return { status: response.status };
        });
    }
    catch (e) {
        return (0, either_1.left)(new indexError_1.IndexError('Indexing all collections error', e));
    }
};
exports.indexingAllCollections = indexingAllCollections;
