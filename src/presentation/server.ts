import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';

// implementation instances
const fileSystemLogRepository = new LogRepositoryImpl(
    // here are the connections to the databases

    // new postgreSQLLogDatasource(),
    // new mongoLogDatasource(),
    // new oracleLogDatasource(),

    new FileSystemDatasource()
);

export class Server {
    public static start() {
        console.log('Server started...');

        // send emails
        const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'leo.cordova.22@gmail.com',
        //     subject: 'System Logs',
        //     htmlBody: `
        //     <h3>System Logs - Network Operation Center (NOC)</h3>
        //     <p>TEST WORKING FINE...</p>
        //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum optio eos ea iusto aperiam doloremque consectetur ad in distinctio explicabo itaque asperiores numquam perferendis blanditiis, iure atque, ab eius est? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt obcaecati quasi libero asperiores! Quae optio rem provident ullam inventore itaque aperiam ratione sequi officia praesentium repellat, at libero fuga voluptates? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quas perspiciatis quia voluptatem id numquam beatae, laudantium, sed quidem accusantium error animi culpa officia facilis quos inventore quasi blanditiis dolore.</p>
        //     <p>See attached records...</p>
        //     `,
        // });

        // CronService.createJob('*/5 * * * * *', () => {
        //     const url = 'https://www.google.com ';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} is OK`),
        //         (error) => console.log(error)

        //         // undefined,
        //         // undefined,
        //     ).execute(url);
        //     // new CheckService().execute('http://localhost:3000');
        // });
    }
}
