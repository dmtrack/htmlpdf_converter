import { User } from '../../db/models/user';

export interface IComment {
    id: number;
    text: string;
    userId: number;
    created: string;
    itemId: number;
}

export interface ICommentWithUser {
    id: number;
    text: string;
    user: User;
    created: string;
    itemId: number;
}
