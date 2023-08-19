const path = require('path');
const outputPath = path.join(__dirname, '../upload/');
const AdmZip = require('adm-zip');
class CompressService {
    async unzipFiles(files: Express.Multer.File[], startCompress: number) {
        let fileName = '';
        if (Array.isArray(files)) {
            await files.forEach((f) => {
                const zip = new AdmZip(f.buffer);
                const zipEntries = zip.getEntries();
                zipEntries.forEach(function (zipEntry: any) {
                    if (
                        zipEntry.name.includes('.html') &&
                        zipEntry.name[0] !== '.'
                    ) {
                        fileName = zipEntry.name;
                        zip.extractEntryTo(
                            /*entry name*/ `${zipEntry.name}`,
                            /*target path*/ outputPath,
                            /*maintainEntryPath*/ true,
                            /*overwrite*/ true
                        );
                    }
                });
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
