import { saveImageToCloud } from '../api/firebase/actions';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ConvertService {
    async htmlToPdf(fileName: string, startConvert: number) {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const targetFile = path.join(__dirname, `../upload/${fileName}.html`);
        const targetPathLength = targetFile.split('/').length;
        const targetName = targetFile.split('/')[targetPathLength - 1];
        const html = fs.readFileSync(targetFile, 'utf-8');
        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        await page.emulateMediaType('screen');

        const pdf = await page.pdf({
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

        const scanUrl: string = await saveImageToCloud(
            pdf,
            'scans',
            targetName
        );

        const pdfPath = path.join(__dirname, `../../${targetName}.pdf`);

        fs.rmSync(targetFile, {
            force: true,
        });
        fs.rmSync(pdfPath, {
            force: true,
        });
        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;

        // Close the browser instance
        await browser.close();
        const finishConvert = Date.now();
        const timeConvert = finishConvert - startConvert;
        return {
            fileUrl: scanUrl,
            convertMemory: usedMemory,
            timeConvert: timeConvert,
        };
    }
}
module.exports = new ConvertService();
