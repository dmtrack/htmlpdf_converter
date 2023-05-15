import { EmptyResultError } from 'sequelize';
import { Like } from '../../db/models/like';
import { ClientToServerEvents } from '../../interfaces/socket/socket-types';
import { AppServer, AppSocket, SocketController } from '../socket-types';
import { User } from '../../db/models/user';
import { flatJoinedModel } from '../../utils/item.utils';

export class LikeSocket implements SocketController {
    constructor(private io: AppServer, private socket: AppSocket) {}

    getLikes: ClientToServerEvents['get:likes'] = async (itemId: number) => {
        this.socket.join(`item:${itemId}`);
        const likes = await Like.findAll({
            where: { itemId },
            include: [{ model: User, attributes: ['name'] }],
        });
        const flatLikes = likes.map(
            (like) => flatJoinedModel(like, [like.user]) as Like
        );

        this.socket.emit('likes', flatLikes);
    };

    setLike: ClientToServerEvents['set:like'] = async ({
        userId,
        itemId,
        name,
    }) => {
        try {
            const like = (await Like.create(
                { userId, itemId },
                { ignoreDuplicates: true }
            )) as unknown as Like;
            this.io
                .to(`item:${itemId}`)
                .emit('like', { ...like.dataValues, name });
        } catch (e) {
            if (e instanceof EmptyResultError) {
                await Like.destroy({ where: { userId, itemId } });
                this.io.to(`item:${itemId}`).emit('cancel_like', userId);
            }
        }
    };

    onEvents() {
        this.socket.on('get:likes', this.getLikes);
        this.socket.on('set:like', this.setLike);
    }
}
