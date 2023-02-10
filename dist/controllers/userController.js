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
const ApiError = require('../exceptions/api-error');
class UserController {
    constructor() {
        this.registration = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.badRequest('Ошибка валидации при регистрации', errors.array()));
                }
                const userData = yield userService.registration(req);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
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
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                console.log('ok');
                const userData = yield userService.login(email, password);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(200).json(token);
            }
            catch (e) {
                next(e);
            }
        });
        this.reconnect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const userData = yield userService.reconnect(id);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
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
        this.toggleBlock = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { dataId } = req.body;
                dataId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield userService.toggleBlock(id);
                }));
                return res.status(200).json({
                    message: `users with ids:${dataId} are blocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.toggleUnBlock = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { dataId } = req.body;
                dataId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield userService.toggleUnBlock(id);
                }));
                return res.status(200).json({
                    message: `users with ids:${dataId} are blocked`,
                    userId: dataId,
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { dataId } = req.body;
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
        // updateUser: RequestHandler = async (req, res, next) => {
        //     try {
        //         const { id } = req.params;
        //         await User.update({ ...req.body }, { where: { id } });
        //         const updatedUser: User | null = await User.findByPk(id);
        //         return res.status(200).json({
        //             message: `user with id: ${id} was updated`,
        //             data: updatedUser,
        //         });
        //     } catch (err: any) {
        //         return err.message;
        //     }
        // };
        // createUser: RequestHandler = async (req, res, next) => {
        //     try {
        //         let user = await User.create({ ...req.body });
        //         console.log('user', user);
        //         return res
        //             .status(200)
        //             .json({ message: 'user created succesfully', data: user });
        //     } catch (err: any) {
        //         return err.message;
        //     }
        // };
        // getAllUsers: RequestHandler = async (req, res, next) => {
        //     try {
        //         const allUsers: User[] = await User.findAll();
        //         return res.status(200).json({
        //             message: `users fetched successfully`,
        //             data: allUsers,
        //         });
        //     } catch (err: any) {
        //         return err.message;
        //     }
        // };
        // getUser: RequestHandler = async (req, res, next) => {
        //     const id = req.params.id;
        //     try {
        //         const user: User | null = await User.findOne({
        //             where: { id: id },
        //         });
        //         if (user) {
        //             return res.status(200).json({
        //                 message: `user with id:${id} is found`,
        //                 user: user,
        //             });
        //         } else
        //             return res.status(200).json({
        //                 message: `user with id:${id} is not found`,
        //             });
        //     } catch (err: any) {
        //         return res.status(404).json({
        //             error: 404,
        //             message: `${err.message}`,
        //         });
        //     }
        // };
        // getUserStatus: RequestHandler = async (req, res, next) => {
        //     try {
        //         const { id } = req.params;
        //         const user: User | null = await User.findByPk(id);
        //         return res.status(200).json({
        //             message: `user with id: ${id} was fetched`,
        //             data: user,
        //         });
        //     } catch (err: any) {
        //         return err.message;
        //     }
        // };
    }
}
module.exports = new UserController();
