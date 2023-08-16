import { Request, Response } from 'express';
import { IUserResponse } from '../interfaces/controllers/fileController.interface';
import { RequestHandler } from 'express';
const fileService = require('../services/file.service');
const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');

class FileController {
    upload: RequestHandler = async (req, res, next) => {
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
            // const response = await fileService.upload(req);
            // res.cookie('refreshToken', response.value.refreshToken, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            //     httpOnly: true,
            //     sameSite: 'none',
            //     domain: process.env.CORS_ORIGIN,
            // });
        } catch (e) {
            next(e);
        }
    };

    getAllLogs: RequestHandler = async (req, res, next) => {
        // try {
        //     const users = await fileService.getAllLogs();
        //     return res.json(users);
        // } catch (e) {
        //     next(e);
        // }
    };

    destroyUser: RequestHandler = async (req, res, next) => {
        // const id = req.params.id;
        // try {
        //     await fileService.deleteUser(id);
        //     return res.status(200).json({
        //         message: `user with id:${id} was deleted`,
        //         userId: id,
        //     });
        // } catch (e) {
        //     next(e);
        // }
    };
}

module.exports = new FileController();
