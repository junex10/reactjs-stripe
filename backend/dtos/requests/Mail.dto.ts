export class MailDTO{
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    attachments?: MailFilesDTO;
}
export class MailFilesDTO{
    filename: string;
    path: string;
}
export class MailNotificationServiceDTO{
    _id: string;
    mailAddress: string;
    subject: string;
    text: string;
    body: string;
    attachments?: MailFilesDTO;
}