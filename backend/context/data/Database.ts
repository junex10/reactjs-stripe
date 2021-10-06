import { connect, connection } from 'mongoose';
import { IDatabase } from '../../interfaces/IDatabase';
import { Utility } from './../../utilitys/Utility';

export class Database implements IDatabase {

    utility: any;
    engine: string;
    connectionString: string;

    constructor() {
        
        this.utility = new Utility();
    }
    public async initialize(): Promise<Object> {
        return await new Promise((resolve, reject) => {
            this.utility.AppSettingsJson()
            .then((x: any) => {
                this.engine = x.Parameters.DatabaseEngine;
                this.connectionString = x.ConnectionStrings.DefaultConnection

                if (this.engine == 'mongoDB') {
                    resolve(connect(this.connectionString));
                }
            });
        });
    }
}
export default { Database };
export { connection };