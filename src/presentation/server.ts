import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';

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
