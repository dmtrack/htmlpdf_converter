import { Comment } from '../db/models/comment';
import { Either, left, right } from '@sweet-monads/either';
import { DBError } from '../errors/DBError';

export const getAllComments = async (): Promise<Either<DBError, Comment[]>> => {
    try {
        return right(await Comment.findAll());
    } catch (e) {
        return left(new DBError('Get all comments error', e));
    }
};
