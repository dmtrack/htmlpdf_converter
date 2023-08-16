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
const fileService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
class FileController {
    constructor() {
        this.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.badRequest('Ошибка валидации при регистрации', errors.array()));
                }
                const response = yield fileService.upload(req);
                // res.cookie('refreshToken', response.value.refreshToken, {
                //     maxAge: 30 * 24 * 60 * 60 * 1000,
                //     httpOnly: true,
                //     sameSite: 'none',
                //     domain: process.env.CORS_ORIGIN,
                // });
                response
                    .mapRight((user) => res.status(200).json(user))
                    .mapLeft((e) => res.status(401).json(e.message));
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllLogs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield fileService.getAllLogs();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
        this.destroyUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield fileService.deleteUser(id);
                return res.status(200).json({
                    message: `user with id:${id} was deleted`,
                    userId: id,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
module.exports = new FileController();
