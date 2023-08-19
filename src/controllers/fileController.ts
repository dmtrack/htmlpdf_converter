import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { IFileRecord } from '../db/models/interface/log.interface';
const fileService = require('../services/file.service');
const compressService = require('../services/compress.service');
const convertService = require('../services/convert.service');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

class FileController {
    upload: RequestHandler = async (req, res, next) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(500).send('No files were uploaded.');
        } else {
            logger.info(`file uploaded`);
        }

        const startCompress = Date.now();
        const { fileName, compressMemory, timeCompress } =
            await compressService.unzipFiles(req.files, startCompress);

        const startConvert = Date.now();
        const { fileUrl, convertMemory, timeConvert } =
            await convertService.htmlToPdf(fileName, startConvert);

        logger.info(
            `file: ${fileName} is compressed in ${timeCompress}ms with heap=${Math.floor(
                compressMemory
            )}`
        );
        logger.info(
            `file: ${fileName} is converted in ${timeConvert}ms with heap=${Math.floor(
                convertMemory
            )}`
        );

        const executingTime = timeCompress + timeConvert;

        try {
            const response: IFileRecord = await fileService.upload({
                name: fileName,
                executingTime: executingTime,
                link: fileUrl,
                memory: Math.floor(compressMemory + convertMemory),
            });

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
