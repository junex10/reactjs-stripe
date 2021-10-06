import { MailFilesDTO } from "../dtos/requests/Mail.dto";

export interface IMail {
    SendMail(mailAddress: string, subject: string, text:string, body: string, files?: MailFilesDTO): Promise<string>;
}
export interface IMailOptions{
    service: string;
    auth: IAuthMail;
    port: number;
    secureTLS: boolean;
}
export interface IAuthMail{
    user: string;
    pass: string;
}