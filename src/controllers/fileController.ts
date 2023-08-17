import { Request, Response } from 'express';
import { RequestHandler } from 'express';
const fileService = require('../services/file.service');
const { validationResult } = require('express-validator');

class FileController {
    upload: RequestHandler = async (req, res, next) => {
        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        console.log(req.file, 'file!!');
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return next(
            //         ApiError.badRequest(
            //             'Ошибка валидации при загрузке',
            //             errors.array()
            //         )
            //     );
            // }
            // const response: IFileRecord = await fileService.upload(req);
            // res.json({
            //     filename: response.name,
            //     executingTime: response.executingTime,
            //     memory: response.memory,
            //     link: response.link,
            //     createdAt: response.createdAt,
            // });
        } catch (e) {
            next(e);
        }
    };

    getRecords: RequestHandler = async (req, res, next) => {
        try {
            const logs = await fileService.getRecords();
            return res.json({ data: logs });
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
