import { IMailNotificationService, IMail, IRobotServiceAPP } from './../interfaces/Index';

import { MailNotificationServiceDTO } from './../dtos/requests/Mail.dto';

import schema from '../context/schemas/MailProcessSchema';

import moment from 'moment';

import { Files } from '../utilitys/Files';

export class MailNotificationService implements IMailNotificationService{

    mail: IMail;

    constructor(
        mail: IMail
    ) {
        this.mail = mail;
    }
    public async SendMailNotification(service: IRobotServiceAPP): Promise<void> {
        return await new Promise(() => {
            setInterval(() => {
                if (service.active) {
                    this.FetchPendingMailProcess()
                    .then((val: MailNotificationServiceDTO[]) => {
                        val.map((valData: MailNotificationServiceDTO) => {
                            this.mail.SendMail(valData.mailAddress, valData.subject, valData.text, valData.body, valData.attachments)
                            .then(() => {
                              schema.schema.findByIdAndUpdate({ _id: valData._id }, {
                                  $set: {
                                      status: 'sended'
                                  }
                              })
                              .then(() => {
                                    const message = `Mail was change status only the collection ${valData.mailAddress}`;
                                    Files.binnacleLog(message);
                                    console.log(message);
                              })
                              .catch(err => {
                                const message = `An unknow error has ocurred try update collection`;
                                Files.errorLog(message);
                                console.log(`${message} - ${err}`)
                              })
                            })
                            .catch(err => {
                                const message = `An unknow error has ocurred try update collection`;
                                Files.errorLog(message);
                                console.log(`${message} - ${err}`)
                            })
                        });
                    })
                    .catch(() => {
                        console.log(`Has not data only collection MailProcess`)
                    });
                }
            }, moment.duration(service.timer, 'minutes').asMilliseconds());
        });
    }
    private async FetchPendingMailProcess(): Promise<any> {
        return await new Promise((resolve, reject) => {
            schema.schema.find({ status: 'pending' })
            .then(val => {
                if (val.length > 0) {
                    resolve(val)
                } else {
                    reject('Has not data only collection MailProcess');
                }
            })
            .catch(err => {
                const message = `An error has ocurred in MailNotificationService when try fetching data in mailProcess`;
                Files.errorLog(message);
                console.log(`${message} - ${err}`);
            });
        });
    }
}