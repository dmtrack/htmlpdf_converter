"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
class UserController {
    constructor() {
        this.registration = async (req, res, next) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.badRequest('Ошибка валидации при регистрации', errors.array()));
                }
                const response = await userService.registration(req);
                res.cookie('refreshToken', response.value.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: true,
                });
                response
                    .mapRight((user) => res.status(200).json(user))
                    .mapLeft((e) => res.status(401).json(e.message));
            }
            catch (e) {
                next(e);
            }
        };
        this.login = async (req, res, next) => {
            const { password, email } = req.body;
            const response = await userService.login(email, password);
            res.cookie('refreshToken', response.value.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: true,
            });
            response
                .mapRight((user) => res.status(200).json(user))
                .mapLeft((e) => res.status(401).json(e));
        };
        this.reconnect = async (req, res, next) => {
            const { id } = req.body;
            const response = await userService.reconnect(id);
            res.cookie('refreshToken', response.value.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: true,
            });
            response
                .mapRight((user) => res.status(200).json(user))
                .mapLeft((e) => res.status(401).json(e));
        };
        this.activate = async (req, res, next) => {
            try {
                const activationLink = req.params.link;
                await userService.activate(activationLink);
                return res.redirect(`${process.env.CLIENT_URL}`);
            }
            catch (e) {
                next(e);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                const { refreshToken } = req.cookies;
                const token = await userService.logout(refreshToken);
                res.clearCookie('refreshToken', {
                    sameSite: true,
                });
                return res.status(200).json(token);
            }
            catch (e) {
                next(e);
            }
        };
        this.refresh = async (req, res, next) => {
            try {
                const { refreshToken } = req.cookies;
                const userData = await userService.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        };
        this.getAllUsers = async (req, res, next) => {
            try {
                const users = await userService.getAllUsers();
                return res.json(users);
            }
            catch (e) {
                next(e);
            }
        };
        this.getUser = async (req, res, next) => {
            const id = req.params.id;
            const response = await userService.getOneUser(id);
            response
                .mapRight((user) => {
                res.status(200).json(user);
            })
                .mapLeft((e) => res.status(401).json(e));
        };
        this.toggleBlock = async (req, res, next) => {
            try {
                const dataId = req.body;
                dataId.forEach(async (id) => {
                    await userService.toggleBlock(id);
                });
                return res.status(200).json({
                    message: `users with ids:${dataId} are blocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                return res.json(e);
            }
        };
        this.toggleUnBlock = async (req, res, next) => {
            const dataId = req.body;
            try {
                dataId.forEach(async (id) => {
                    await userService.toggleUnBlock(id);
                });
                return res.status(200).json({
                    message: `users with ids:${dataId} are unblocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                return res.json(e);
            }
        };
        this.deleteUser = async (req, res, next) => {
            const dataId = req.body;
            try {
                dataId.forEach(async (id) => {
                    await userService.deleteUser(id);
                });
                return res.status(200).json({
                    message: `users with ids:${dataId} are deleted`,
                    userId: dataId,
                });
            }
            catch (e) {
                next(e);
            }
        };
    }
}
module.exports = new UserController();
