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
const fileService = require('../services/file.service');
const compressService = require('../services/compress.service');
const convertService = require('../services/convert.service');
const { validationResult } = require('express-validator');
class FileController {
    constructor() {
        this.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            const start = Date.now();
            const { fileName, compressMemory } = yield compressService.unzipFiles(req.files);
            const { fileUrl, convertMemory } = yield convertService.htmlToPdf(fileName);
            const finish = Date.now();
            const executingTime = finish - start;
            try {
                const response = yield fileService.upload({
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
            }
            catch (e) {
                next(e);
            }
        });
        this.getRecords = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const logs = yield fileService.getRecords();
                return res.json({ data: logs });
            }
            catch (e) {
                next(e);
            }
        });
        this.destroyUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
module.exports = new FileController();
