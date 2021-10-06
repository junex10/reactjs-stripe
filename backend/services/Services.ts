/**
* @Utility
*/

import { Mail } from './../utilitys/Mail';
import { Utility } from '../utilitys/Utility';
import { Files } from './../utilitys/Files';

/**
*  @interface 
*/
import { 
    IDatabase,
    IMailNotificationService,
    IAPPSettings
} from '../interfaces/Index';
/**
* @modules
*/

import { initializedContext } from './../context/data/DBContext';
import { Database } from './../context/data/Database';

/**
*   @services 
**/

import { MailNotificationService } from './MailNotificationService';

export class Services {

    private readonly Database: IDatabase;
    private readonly MailService: IMailNotificationService;

    constructor(
        database: IDatabase,
        mailService: IMailNotificationService
    ) {
        this.Database = database;
        this.MailService = mailService;

        this.Database.initialize().then(x => {
            initializedContext.initialize();

            new Utility().AppSettingsJson()
            .then((val: IAPPSettings) => {
                if (val.Parameters.RobotTimer.generalRobotTimer) {
                    const SendMailNotification = val.Parameters.RobotTimer.services.MailNotification;
                    this.MailService.SendMailNotification(SendMailNotification);
                }
            })
            .catch((err) => {
                const message = 'An error has ocurred fetching the APPSettings Data in Services';
                Files.errorLog(message);
                console.log(`${message} - ${err}`)
            });
        });
    }
}
new Services(
    new Database(),
    new MailNotificationService(new Mail())
);