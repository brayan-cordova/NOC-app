import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { Attachment } from 'nodemailer/lib/mailer';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

// interfaces
interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachments {
    filename: string;
    path: string;
}

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

    constructor(private readonly LogRepository: LogRepository) {}

    // send email
    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log(sendInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            });
            this.LogRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            });
            this.LogRepository.saveLog(log);
            return false;
        }
    }

    // send email with File System Logs
    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Server Logs';
        const htmlBody = `
            <h3>System Logs - Network Operation Center (NOC)</h3>
            <p>TEST WORKING FINE...</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum optio eos ea iusto aperiam doloremque consectetur ad in distinctio explicabo itaque asperiores numquam perferendis blanditiis, iure atque, ab eius est? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati quasi libero asperiores! Quae optio rem provident ullam inventore itaque aperiam ratione sequi officia praesentium repellat, at libero fuga voluptates? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas perspiciatis quia voluptatem id numquam beatae, laudantium, sed quidem accusantium error animi culpa officia facilis quos inventore quasi blanditiis dolore.</p>
            <p>See attached records...</p>
            `;
        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log',
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
        ];

        return this.sendEmail({
            to,
            subject,
            attachments,
            htmlBody,
        });
    }
}
