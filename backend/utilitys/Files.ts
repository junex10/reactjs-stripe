import { readFileSync, writeFileSync } from 'fs';
import { Utility } from './Utility';

const utility = new Utility();

export class Files {

    constructor() {

    }
    public static async log(filename: string, message: string): Promise<void> {
        await this.controlFiles('any')
        .then(validate => {
            if (validate) {
                const date = new Date();
                const dateString = this.dateString(date);
                writeFileSync(`./logs/${filename}.txt`, `${dateString} - ${message}\n`, {
                    encoding: "utf-8",
                    flag: 'a+'
                });
            }
        });
    }
    public static getLog(pathname: string): void  {
        readFileSync(`./logs/${pathname}.txt`, 'utf-8');
    }
    public static async errorLog(message: string): Promise<void> {
        await this.controlFiles('errorLog')
        .then(validate => {
            if (validate) {
                const date = new Date();
                const dateString = this.dateString(date);
                writeFileSync(`./logs/ErrorLogs.txt`, `${dateString} - ${message}\n`, {
                    encoding: "utf-8",
                    flag: 'a+'
                });
            }
        });
    }
    public static async binnacleLog(message: string): Promise<void> {
        await this.controlFiles('binnacleLog')
        .then(validate => {
            if (validate) {
                const date = new Date();
                const dateString = this.dateString(date);
                writeFileSync(`./logs/BinnacleLogs.txt`, `${dateString} - ${message}\n`, {
                    encoding: "utf-8",
                    flag: 'a+'
                });
            }
        });
    }
    private static dateString(date: Date): string {
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    private static async controlFiles(parameter: string): Promise<boolean | any> {
        return await new Promise((resolve, reject) => {
            utility.AppSettingsJson()
            .then((x: any) => {
                const logs = x.Parameters.Logs;
                if (!logs.apply) {
                    resolve(false);
                } else {
                    if (parameter !== 'any') {
                        if (!eval(`logs.${parameter}`)) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    }
                }
            })
            .catch(y => reject(y))
        });
    }
}