import { Item } from '../db/models/item';
import { filterItem } from '../utils/item.utils';
import { Comment } from '../db/models/comment';
import { Collection } from '../db/models/collection';
import { Either, left } from '@sweet-monads/either';
import { IndexError } from '../errors/indexError';
import { TaskStatus } from 'meilisearch';
import { SearchClient } from '../api/meilisearch';

const ItemService = require('./item.service');
const CollectionService = require('./collection.service');
const CommentService = require('./comment.service');

export const addItemIndex = (item: Item) => {
    const index = new SearchClient().index('items');

    index
        .addDocuments([filterItem(item)])
        .catch((e: any) => console.log('CREATE_INDEX_ERROR', e));
};

export const uploadItemIndex = (item: Item) => {
    const index = new SearchClient().index('items');
    index
        .updateDocuments([item])
        .catch((e: any) => console.log('UPLOAD_INDEX_ERROR', e));
};

export const removeItemIndex = (itemId: number) => {
    const index = new SearchClient().index('items');
    index
        .deleteDocument(itemId)
        .catch((e: any) => console.log('DELETE_INDEX_ERROR', e));
};

export const addCommentIndex = (comment: Comment) => {
    const index = new SearchClient().index('comments');
    index
        .addDocuments([comment.dataValues])
        .catch((e: any) => console.log('CREATE_INDEX_ERROR', e));
};

export const removeCommentIndex = (commentId: number) => {
    const index = new SearchClient().index('comments');
    index
        .deleteDocument(commentId)
        .catch((e: any) => console.log('DELETE_INDEX_ERROR', e));
};

export const removeItemCommentsIndexes = async (itemId: number) => {
    const index = new SearchClient().index('comments');
    const itemCommentIds = (await Comment.findAll({ where: { itemId } })).map(
        (comment) => comment.id
    );
    index
        .deleteDocuments(itemCommentIds)
        .catch((e: any) => console.log('DELETE_INDEXES_ERROR', e));
};

export const addCollectionIndex = (collection: Collection) => {
    const index = new SearchClient().index('collections');

    index
        .addDocuments([collection.dataValues])
        .catch((e: any) => console.log('CREATE_INDEX_ERROR', e));
};

export const uploadCollectionIndex = (collection: Collection) => {
    const index = new SearchClient().index('collections');
    index
        .updateDocuments([collection])
        .catch((e: any) => console.log('UPLOAD_INDEX_ERROR', e));
};

export const removeCollectionIndex = (collectionId: number) => {
    const index = new SearchClient().index('collections');
    index
        .deleteDocument(collectionId)
        .catch((e: any) => console.log('DELETE_INDEX_ERROR', e));
};

export const removeCollectionRelationshipIndexes = async (
    collectionId: number
) => {
    const client = new SearchClient();
    const itemIndex = client.index('items');
    const commentIndex = client.index('comments');
    const itemIds = (await Item.findAll({ where: { collectionId } })).map(
        (item) => item.id
    );
    const commentIds = (
        await Comment.findAll({ where: { itemId: itemIds } })
    ).map((comment: Comment) => comment.id);
    itemIndex
        .deleteDocuments(itemIds)
        .catch((e: any) => console.log('DELETE_INDEXES_ERROR', e));
    commentIndex
        .deleteDocuments(commentIds)
        .catch((e: any) => console.log('DELETE_INDEXES_ERROR', e));
};

export const indexingAllItems = async (): Promise<
    Either<IndexError, { status: TaskStatus }>
> => {
    try {
        const index = new SearchClient().index('items');
        await index.deleteAllDocuments();
        return (await ItemService.getAllItems())
            .mapLeft((e: any) => new IndexError('Get items error', e))
            .asyncMap(async (items: Item[]) => {
                const response = await index.addDocuments(
                    items.map((item) => filterItem(item))
                );
                return { status: response.status };
            });
    } catch (e) {
        return left(new IndexError('Indexing all items error', e));
    }
};

export const indexingAllComments = async (): Promise<
    Either<IndexError, { status: TaskStatus }>
> => {
    try {
        const index = new SearchClient().index('comments');
        await index.deleteAllDocuments();
        return (await CommentService.getAllComments())
            .mapLeft((e: any) => new IndexError('Get comments error', e))
            .asyncMap(async (comments: Comment[]) => {
                const response = await index.addDocuments(comments);
                return { status: response.status };
            });
    } catch (e) {
        return left(new IndexError('Indexing all comments error', e));
    }
};

export const indexingAllCollections = async (): Promise<
    Either<IndexError, { status: TaskStatus }>
> => {
    try {
        const index = new SearchClient().index('collections');
        await index.deleteAllDocuments();
        return (await CollectionService.getAllCollections())
            .mapLeft((e: any) => new IndexError('Get collections error', e))
            .asyncMap(async (collections: Collection[]) => {
                const response = await index.addDocuments(collections);
                return { status: response.status };
            });
    } catch (e) {
        return left(new IndexError('Indexing all collections error', e));
    }
};
