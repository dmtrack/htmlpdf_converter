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
const actions_1 = require("../api/firebase/actions");
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
class ConvertService {
    htmlToPdf(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch();
            const page = yield browser.newPage();
            const targetFile = path.join(__dirname, `../upload/${fileName}.html`);
            const targetPathLength = targetFile.split('/').length;
            const targetName = targetFile.split('/')[targetPathLength - 1];
            const html = fs.readFileSync(targetFile, 'utf-8');
            yield page.setContent(html, { waitUntil: 'domcontentloaded' });
            yield page.emulateMediaType('screen');
            const pdf = yield page.pdf({
                path: `${targetName}.pdf`,
                margin: {
                    top: '100px',
                    right: '50px',
                    bottom: '100px',
                    left: '50px',
                },
                printBackground: true,
                format: 'A4',
            });
            const scanUrl = yield (0, actions_1.saveImageToCloud)(pdf, 'scans', targetName);
            const pdfPath = path.join(__dirname, `../../${targetName}.pdf`);
            fs.rmSync(targetFile, {
                force: true,
            });
            fs.rmSync(pdfPath, {
                force: true,
            });
            const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
            // Close the browser instance
            yield browser.close();
            return { fileUrl: scanUrl, convertMemory: usedMemory };
        });
    }
}
module.exports = new ConvertService();
