import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {
    transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options);
    }

    sendActivationMail = async (to: string, link: string) => {
        try {
            console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD);

            await this.transporter.sendMail({
                from: `collections.app2023@gmail.com`,
                to,
                subject:
                    `активация аккаунта приложения для создания коллекций ` +
                    process.env.API_URL,
                text: '',
                html: `
            
                    <div>
                        <h1>Для активации учетной записи перейдите по ссылке</h1>
                        <a href=${link}>${link}</a>
                    </div>
                    
                    `,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = new MailService();
