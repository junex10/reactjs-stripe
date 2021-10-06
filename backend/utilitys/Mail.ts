import nodemailer from 'nodemailer';

import { IMail, IMailOptions } from '../interfaces/IMail';

import { MailFilesDTO, MailDTO } from '../dtos/requests/Mail.dto';

import { Files } from './Files';
import { Utility } from './Utility';

export class Mail implements IMail {

    smtpTransport: IMailOptions;

    constructor(

    ) {

        const smtpData = new Utility()
        .AppSettingsJson()
        .then((setting: any) => {
            this.smtpTransport = {
                service: setting.Smtp.SmtpServidor,
                auth: {
                    user: setting.Smtp.Mail,
                    pass: setting.Smtp.PasswordMail
                },
                port: setting.Smtp.Port,
                secureTLS: setting.Smtp.TLS
            };
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        });
    }

    public async SendMail(mailAddress: string, subject: string, text: string, body: string, files: MailFilesDTO = null): Promise<string> {
        return await new Promise((resolve, reject) => {
            const transport = nodemailer.createTransport({
                host: this.smtpTransport.service,
                port: this.smtpTransport.port,
                secure: this.smtpTransport.secureTLS,
                auth: {
                    user: this.smtpTransport.auth.user,
                    pass: this.smtpTransport.auth.pass
                }
            });
            const mailToSend: MailDTO = {
                from: this.smtpTransport.auth.user,
                to: mailAddress,
                subject: subject,
                text: text,
                html: body
            };
            if (files != null) mailToSend.attachments = files;
            transport.sendMail(mailToSend)
            .then((valMail) => {
                Files.binnacleLog(`Mail notification was send to the user ${mailToSend.to}`);
                resolve(`Mail notification was send to the user ${mailToSend.to}`);
            })
            .catch(err => {
                reject(`Can't not process the email ${mailToSend.to}, unknow error`)
                console.log(`Can't not process the email: ${err}`);
                Files.errorLog(`Can't not process the email ${mailToSend.to}, unknow error`);
            })
            .finally(() => {
                transport.close();
            });
        });
    }
}