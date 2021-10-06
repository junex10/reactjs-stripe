export interface MailProcess{
    mailAddress: string;
    subject: string;
    text: string;
    body: string;
    status: string;
    files?: string;
    service: string;
}