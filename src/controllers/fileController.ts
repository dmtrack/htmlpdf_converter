import { Request, Response } from 'express';
import { RequestHandler } from 'express';
const fileService = require('../services/file.service');
const compressService = require('../services/compress.service');
const { validationResult } = require('express-validator');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class FileController {
    upload: RequestHandler = async (req, res, next) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        compressService.unzipFiles(req.files);

        (async () => {
            // Create a browser instance
            const browser = await puppeteer.launch();

            // Create a new page
            const page = await browser.newPage();
            const targetFile = path.join(__dirname, '../upload/index.html');

            const html = fs.readFileSync(targetFile, 'utf-8');
            await page.setContent(html, { waitUntil: 'domcontentloaded' });
            //To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');

            // Downlaod the PDF
            const pdf = await page.pdf({
                path: 'index.pdf',
                margin: {
                    top: '100px',
                    right: '50px',
                    bottom: '100px',
                    left: '50px',
                },
                printBackground: true,
                format: 'A4',
            });
            const oldPath = path.join(__dirname, '../../index.pdf');
            const newPath = path.join(__dirname, '../upload/index.pdf');

            fs.rename(oldPath, newPath, function (err: Error) {
                if (err) throw err;
            });
            // Close the browser instance
            await browser.close();
        })();

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
