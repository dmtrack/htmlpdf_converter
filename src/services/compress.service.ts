const path = require('path');
const outputPath = path.join(__dirname, '../upload/');
const AdmZip = require('adm-zip');
class CompressService {
    async unzipFiles(files: Express.Multer.File[], startCompress: number) {
        let fileName = '';
        if (Array.isArray(files)) {
            await files.forEach((f) => {
                if (f.mimetype === 'application/zip') {
                    const zip = new AdmZip(f.buffer);
                    const zipEntries = zip.getEntries();
                    zipEntries.forEach(function (zipEntry: any) {
                        fileName = zipEntry.entryName.split('._')[1];
                        if (
                            zipEntry.entryName.includes('.html') &&
                            !!fileName
                        ) {
                            zip.extractEntryTo(
                                /*entry name*/ `${fileName.split('.')[0]}.html`,
                                /*target path*/ outputPath,
                                /*maintainEntryPath*/ true,
                                /*overwrite*/ true
                            );
                        }
                    });
                }
            });
        }
        const finishCompress = Date.now();
        const timeCompress = finishCompress - startCompress;
        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;

        return {
            fileName: fileName.split('.')[0],
            compressMemory: usedMemory,
            timeCompress: timeCompress,
        };
    }
}
module.exports = new CompressService();
