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
exports.getAllComments = void 0;
const comment_1 = require("../db/models/comment");
const either_1 = require("@sweet-monads/either");
const DBError_1 = require("../errors/DBError");
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, either_1.right)(yield comment_1.Comment.findAll());
    }
    catch (e) {
        return (0, either_1.left)(new DBError_1.DBError('Get all comments error', e));
    }
});
exports.getAllComments = getAllComments;
