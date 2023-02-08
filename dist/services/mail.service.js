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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.sendActivationMail = (to, link) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD);
                yield this.transporter.sendMail({
                    from: `collections.app2023@gmail.com`,
                    to,
                    subject: `активация аккаунта приложения для создания коллекций ` +
                        process.env.API_URL,
                    text: '',
                    html: `
            
                    <div>
                        <h1>Для активации учетной записи перейдите по ссылке</h1>
                        <a href=${link}>${link}</a>
                    </div>
                    
                    `,
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
}
module.exports = new MailService();
