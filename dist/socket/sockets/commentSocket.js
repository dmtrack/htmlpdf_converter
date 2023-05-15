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
exports.CommentSocket = void 0;
const user_1 = require("../../db/models/user");
const comment_1 = require("../../db/models/comment");
const item_utils_1 = require("../../utils/item.utils");
class CommentSocket {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.getComments = (itemId) => __awaiter(this, void 0, void 0, function* () {
            this.socket.join(`item:${itemId}`);
            const comments = yield comment_1.Comment.findAll({
                where: { itemId },
                include: [{ model: user_1.User, attributes: ['name'] }],
            });
            this.socket.emit('comments', comments.map((c) => (0, item_utils_1.flatJoinedModel)(c, [c.user])));
        });
        this.addComment = ({ userId, itemId, text, name, }) => __awaiter(this, void 0, void 0, function* () {
            const newComment = yield comment_1.Comment.create({
                userId,
                itemId,
                text,
                created: `${Date.now()}`,
            });
            this.io
                .to(`item:${itemId}`)
                .emit('new_comment', Object.assign(Object.assign({}, newComment.dataValues), { name }));
        });
    }
    onEvents() {
        this.socket.on('get:comments', this.getComments);
        this.socket.on('add:comment', this.addComment);
    }
}
exports.CommentSocket = CommentSocket;
