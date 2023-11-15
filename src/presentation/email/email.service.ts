import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    //todo: attachments:
}

// todo: Attachments

// here is the adapter pattern

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        tls: { rejectUnauthorized: false },
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody } = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });

            console.log(sendInformation);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
