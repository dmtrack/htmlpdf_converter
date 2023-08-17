const path = require('path');
const outputPath = path.join(__dirname, '../upload/');
const AdmZip = require('adm-zip');

class CompressService {
    async unzipFiles(files: Express.Multer.File[]) {
        let fileName = '';
        if (Array.isArray(files)) {
            await files.forEach((f) => {
                if (f.mimetype === 'application/zip') {
                    const zip = new AdmZip(f.buffer);
                    const zipEntries = zip.getEntries();
                    console.log(zipEntries.toString(), 'zipentries');
                    zipEntries.forEach(function (zipEntry: any) {
                        fileName = zipEntry.entryName.split('._')[1];
                        console.log(fileName, 'filename inside');
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
        return fileName.split('.')[0];
    }
}
module.exports = new CompressService();
