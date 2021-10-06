import { IRobotServiceAPP } from "../IAPPSettings";
export interface IMailNotificationService{
    SendMailNotification(timer?: IRobotServiceAPP): Promise<void>;
}