const path = require('path');
const outputPath = path.join(__dirname, '../upload/');
const AdmZip = require('adm-zip');

class CompressService {
    unzipFiles(files: Express.Multer.File[]) {
        if (Array.isArray(files)) {
            files.forEach((f) => {
                if (f.mimetype === 'application/zip') {
                    const zip = new AdmZip(f.buffer);
                    const zipEntries = zip.getEntries();
                    zipEntries.forEach(function (zipEntry: any) {
                        if (zipEntry.entryName == 'index.html') {
                            zip.extractEntryTo(
                                /*entry name*/ 'index.html',
                                /*target path*/ outputPath,
                                /*maintainEntryPath*/ true,
                                /*overwrite*/ true
                            );
                        }
                    });
                }
            });
        }
    }
}
module.exports = new CompressService();
