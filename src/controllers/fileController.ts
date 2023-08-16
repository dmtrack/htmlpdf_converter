import { Request, Response } from 'express';
import { IUserResponse } from '../interfaces/controllers/fileController.interface';
import { RequestHandler } from 'express';
import { IFileRecord } from '../db/models/interface/log.interface';
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
                        'Ошибка валидации при загрузке',
                        errors.array()
                    )
                );
            }
            const response: IFileRecord = await fileService.upload(req);
            console.log(response, 'responce');
            res.json({
                filename: response.name,
                executingTime: response.executingTime,
                memory: response.memory,
                link: response.link,
                createdAt: response.createdAt,
            });
        } catch (e) {
            next(e);
        }
    };

    getAllLogs: RequestHandler = async (req, res, next) => {
        try {
            const logs = await fileService.getAllLogs();
            return res.json(logs);
        } catch (e) {
            next(e);
        }
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
