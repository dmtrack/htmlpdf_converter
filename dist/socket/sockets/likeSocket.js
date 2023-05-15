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
exports.LikeSocket = void 0;
const sequelize_1 = require("sequelize");
const like_1 = require("../../db/models/like");
const user_1 = require("../../db/models/user");
const item_utils_1 = require("../../utils/item.utils");
class LikeSocket {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.getLikes = (itemId) => __awaiter(this, void 0, void 0, function* () {
            this.socket.join(`item:${itemId}`);
            const likes = yield like_1.Like.findAll({
                where: { itemId },
                include: [{ model: user_1.User, attributes: ['name'] }],
            });
            const flatLikes = likes.map((like) => (0, item_utils_1.flatJoinedModel)(like, [like.user]));
            this.socket.emit('likes', flatLikes);
        });
        this.setLike = ({ userId, itemId, name, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = (yield like_1.Like.create({ userId, itemId }, { ignoreDuplicates: true }));
                this.io
                    .to(`item:${itemId}`)
                    .emit('like', Object.assign(Object.assign({}, like.dataValues), { name }));
            }
            catch (e) {
                if (e instanceof sequelize_1.EmptyResultError) {
                    yield like_1.Like.destroy({ where: { userId, itemId } });
                    this.io.to(`item:${itemId}`).emit('cancel_like', userId);
                }
            }
        });
    }
    onEvents() {
        this.socket.on('get:likes', this.getLikes);
        this.socket.on('set:like', this.setLike);
    }
}
exports.LikeSocket = LikeSocket;
