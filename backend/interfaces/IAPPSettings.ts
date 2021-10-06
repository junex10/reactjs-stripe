export interface IAPPSettings{
    ConnectionString: IConnectionStringAPP;
    Smtp: ISMTPAPP;
    Jwt: IJWTAPP;
    Directory: IDirectoryAPP;
    Parameters: IParametersAPP;
    applySeeders: boolean;
}
export interface IConnectionStringAPP{
    DefaultConnection: string;
}
export interface ISMTPAPP{
    SmtpServidor: string;
    Mail: string;
    PasswordMail: string;
    Port: number;
    TLS: boolean;
}
export interface IJWTAPP{
    Key: string;
}
export interface IDirectoryAPP{
    Template: string;
}
export interface IParametersAPP{
    DatabaseEngine: string;
    RobotTimer: IRobotTimerAPP;
    Logs: ILogsAPP;
}
export interface IRobotTimerAPP{
    generalRobotTimer: boolean;
    services: IServicesAPP;
}
export interface IServicesAPP{
    MailNotification: IRobotServiceAPP;
}
export interface IRobotServiceAPP{
    timer: number;
    active: boolean;
}
export interface ILogsAPP{
    apply: boolean;
    binnacleLog: boolean;
    errorLog: boolean;
}