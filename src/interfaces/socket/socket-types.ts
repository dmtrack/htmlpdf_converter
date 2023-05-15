import { Comment } from './../../db/models/comment';
import { Like } from '../../db/models/like';

export interface ClientToServerEvents {
    'get:comments': (itemId: number) => void;
    'get:likes': (itemId: number) => void;
    'add:comment': ({}: {
        userId: number;
        itemId: number;
        text: string;
        name: string;
    }) => void;
    'set:like': ({}: { userId: number; itemId: number; name: string }) => void;
}

export interface ServerToClientEvents {
    comments: (comments: Comment[]) => void;
    new_comment: (comment: Comment) => void;
    likes: (likes: Like[]) => void;
    like: (like: Like) => void;
    cancel_like: (userId: number) => void;
    token_error: () => void;
}

export interface SocketData {}
