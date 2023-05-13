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
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
class UserController {
    constructor() {
        this.registration = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.badRequest('Ошибка валидации при регистрации', errors.array()));
                }
                const response = yield userService.registration(req);
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
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { password, email } = req.body;
            const response = yield userService.login(email, password);
            // res.cookie('refreshToken', response.value.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
            response
                .mapRight((user) => res.status(200).json(user))
                .mapLeft((e) => res.status(401).json(e));
        });
        this.reconnect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const response = yield userService.reconnect(id);
            // res.cookie('refreshToken', response.value.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
            response
                .mapRight((user) => res.status(200).json(user))
                .mapLeft((e) => res.status(401).json(e));
        });
        this.activate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                yield userService.activate(activationLink);
                return res.redirect(`${process.env.CLIENT_URL}`);
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield userService.logout(refreshToken);
                // res.clearCookie('refreshToken', {
                //     maxAge: 30 * 24 * 60 * 60 * 1000,
                //     httpOnly: true,
                //     sameSite: 'none',
                //     domain: process.env.CORS_ORIGIN,
                // });
                return res.status(200).json(token);
            }
            catch (e) {
                next(e);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService.refresh(refreshToken);
                console.log(userData);
                // res.cookie('refreshToken', userData.refreshToken, {
                //     maxAge: 30 * 24 * 60 * 60 * 1000,
                //     httpOnly: true,
                //     sameSite: 'none',
                //     domain: process.env.CORS_ORIGIN,
                // });
                return res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const response = yield userService.getOneUser(id);
            response
                .mapRight((user) => {
                res.status(200).json(user);
            })
                .mapLeft((e) => res.status(401).json(e));
        });
        this.toggleBlock = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dataId = req.body;
                dataId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield userService.toggleBlock(id);
                }));
                return res.status(200).json({
                    message: `users with ids:${dataId} are blocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.toggleUnBlock = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dataId = req.body;
            try {
                dataId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield userService.toggleUnBlock(id);
                }));
                return res.status(200).json({
                    message: `users with ids:${dataId} are unblocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                return res.json(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dataId = req.body;
            try {
                dataId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield userService.deleteUser(id);
                }));
                return res.status(200).json({
                    message: `users with ids:${dataId} are deleted`,
                    userId: dataId,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
module.exports = new UserController();
