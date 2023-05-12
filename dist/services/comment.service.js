"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllComments = void 0;
const comment_1 = require("../db/models/comment");
const either_1 = require("@sweet-monads/either");
const DBError_1 = require("../errors/DBError");
const getAllComments = async () => {
    try {
        return (0, either_1.right)(await comment_1.Comment.findAll());
    }
    catch (e) {
        return (0, either_1.left)(new DBError_1.DBError('Get all comments error', e));
    }
};
exports.getAllComments = getAllComments;
