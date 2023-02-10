import { RequestHandler } from 'express';
import { IRegistrationUserResponse } from '../interfaces/controllers/userController.interface';
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    registration: RequestHandler = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.badRequest(
                        'Ошибка валидации при регистрации',
                        errors.array()
                    )
                );
            }
            const userData: IRegistrationUserResponse =
                await userService.registration(req);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    };

    activate: RequestHandler = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}`);
        } catch (e) {
            next(e);
        }
    };

    login: RequestHandler = async (req, res, next) => {
        try {
            const { password, email } = req.body;
            console.log('ok');

            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    };

    logout: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    };

    reconnect: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.body;
            const userData = await userService.reconnect(id);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    };

    refresh: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    };

    getAllUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    };

    toggleBlock: RequestHandler = async (req, res, next) => {
        try {
            const { dataId } = req.body;
            dataId.forEach(async (id: string) => {
                await userService.toggleBlock(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are blocked`,
                userId: dataId,
            });
        } catch (e) {
            next(e);
        }
    };

    toggleUnBlock: RequestHandler = async (req, res, next) => {
        try {
            const { dataId } = req.body;
            dataId.forEach(async (id: string) => {
                await userService.toggleUnBlock(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are blocked`,
                userId: dataId,
            });
        } catch (e) {
            next(e);
        }
    };

    deleteUser: RequestHandler = async (req, res, next) => {
        try {
            console.log(req.body);

            const { dataId } = req.body;
            dataId.forEach(async (id: string) => {
                await userService.deleteUser(id);
            });
            return res.status(200).json({
                message: `users with ids:${dataId} are deleted`,
                userId: dataId,
            });
        } catch (e) {
            next(e);
        }
    };
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

module.exports = new UserController();
