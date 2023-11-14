import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';

// implementation instances
const fileSystemLogRepository = new LogRepositoryImpl(
    // new postgreSQLLogDatasource(),
    // new mongoLogDatasource(),
    // new oracleLogDatasource(),

    new FileSystemDatasource()
);

export class Server {
    public static start() {
        console.log('Server started...');

        CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://localhost:3000';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(url);
            // new CheckService().execute('http://localhost:3000');
        });
    }
}
