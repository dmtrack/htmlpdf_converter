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
const path = require('path');
const outputPath = path.join(__dirname, '../upload/');
const AdmZip = require('adm-zip');
class CompressService {
    unzipFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = '';
            if (Array.isArray(files)) {
                yield files.forEach((f) => {
                    if (f.mimetype === 'application/zip') {
                        const zip = new AdmZip(f.buffer);
                        const zipEntries = zip.getEntries();
                        zipEntries.forEach(function (zipEntry) {
                            fileName = zipEntry.entryName.split('._')[1];
                            if (zipEntry.entryName.includes('.html') &&
                                !!fileName) {
                                zip.extractEntryTo(
                                /*entry name*/ `${fileName.split('.')[0]}.html`, 
                                /*target path*/ outputPath, 
                                /*maintainEntryPath*/ true, 
                                /*overwrite*/ true);
                            }
                        });
                    }
                });
            }
            const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
            return { fileName: fileName.split('.')[0], compressMemory: usedMemory };
        });
    }
}
module.exports = new CompressService();
