import { saveImageToCloud } from '../api/firebase/actions';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ConvertService {
    async htmlToPdf() {
        // Create a browser instance
        const browser = await puppeteer.launch();

        // Create a new page
        const page = await browser.newPage();
        const targetFile = path.join(__dirname, '../upload/index.html');
        const targetPathLength = targetFile.split('/').length;
        const targetName = targetFile.split('/')[targetPathLength - 1];
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
        // console.log(pdf, 'pdf');
        const scanUrl: string = await saveImageToCloud(
            pdf,
            'scans',
            targetName
        );

        const pdfPath = path.join(__dirname, '../../index.pdf');
        // const newPath = path.join(__dirname, '../upload/index.pdf');

        // fs.rename(oldPath, newPath, function (err: Error) {
        //     if (err) throw err;
        // });
        fs.rmSync(targetFile, {
            force: true,
        });
        fs.rmSync(pdfPath, {
            force: true,
        });

        // Close the browser instance
        await browser.close();
        return scanUrl;
    }
}
module.exports = new ConvertService();
