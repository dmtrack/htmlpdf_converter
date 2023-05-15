import { User } from '../../db/models/user';
import { Comment } from '../../db/models/comment';
import { ClientToServerEvents } from '../../interfaces/socket/socket-types';
import { flatJoinedModel } from '../../utils/item.utils';
import { AppServer, AppSocket, SocketController } from '../socket-types';

export class CommentSocket implements SocketController {
    constructor(private io: AppServer, private socket: AppSocket) {}

    private getComments: ClientToServerEvents['get:comments'] = async (
        itemId: number
    ) => {
        this.socket.join(`item:${itemId}`);
        const comments = await Comment.findAll({
            where: { itemId },
            include: [{ model: User, attributes: ['name'] }],
        });

        this.socket.emit(
            'comments',
            comments.map((c) => flatJoinedModel(c, [c.user]) as Comment)
        );
    };

    private addComment: ClientToServerEvents['add:comment'] = async ({
        userId,
        itemId,
        text,
        name,
    }) => {
        const newComment = await Comment.create({
            userId,
            itemId,
            text,
            created: `${Date.now()}`,
        });

        this.io
            .to(`item:${itemId}`)
            .emit('new_comment', { ...newComment.dataValues, name });
    };

    onEvents() {
        this.socket.on('get:comments', this.getComments);
        this.socket.on('add:comment', this.addComment);
    }
}
