import { Database, connection } from './Database';
import { Utility } from '../../utilitys/Utility';

import Users from './../schemas/UsersSchema';
import Views from './../schemas/ViewsSchema';
import MailProcess from './../schemas/MailProcessSchema';

import { ISchema } from '../../interfaces/ISchema';

import { Files } from './../../utilitys/Files';

import * as bcrypt from 'bcrypt';
import { BcryptEnum } from '../../commons/enum/index.enum';

export class DBContext {

    users: any;
    views: any;
    mailProcess: any;

    utility: any;

    dataBase: any;

    constructor(
        private Users: ISchema,
        private Views: ISchema,
        private MailProcess: ISchema
    ) {

        this.users = Object.values(Users);
        this.views = Object.values(Views);
        this.mailProcess = Object.values(MailProcess);

        this.utility = new Utility();
    }

    public async initialize() {
        await this.utility.AppSettingsJson()
            .then(x => {
                this.dataBase = new Database();
                if (x.applySeeders) this.SeedersGenerate();
            });
    }

    private SeedersGenerate() {
        this.dataBase.initialize()
            .then(x => {
                console.log('Seeding... -> ');
                this.Collection();
            })
            .catch(err => {
                const message = `An error has ocurred while connecting to database \n ${err}`;
                console.log(message);
                Files.errorLog(message);
                Files.binnacleLog(message);
            })
    }
    private CreateSeeders(seeder, model, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await model.create(data);
                resolve(seeder);
            }
            catch (ex) {
                reject(ex);
            }
        });
    }
    private Create(model, config = null, field = null, data = null) {
        return new Promise(async (resolve, reject) => {
            if (data.length > 0) {
                const seeder = config.collection;
                const fieldBcrypt = config.bcrypt != undefined ? config.bcrypt : null;
                await data.map(async (x, i) => {
                    const compare = eval(`x.${field}`);
                    model.find().where(field, compare).then(async val => {
                        if (val.length == 0 && x.apply) {
                            let replaceBcrypt = eval(`x.${fieldBcrypt}`);
                            if (replaceBcrypt != undefined) {
                                await bcrypt.hash(replaceBcrypt, BcryptEnum.saltRound)
                                    .then((passwordHashed: string) => eval(`x.${fieldBcrypt} = '${passwordHashed}'`));
                            }
                            this.CreateSeeders(seeder, model, x)
                                .catch(err => {
                                    const message = `An error has ocurred while seeding ${err}`;
                                    console.log(message);
                                    Files.errorLog(message);
                                    Files.binnacleLog(message);
                                })
                        }
                        if (i == data.length - 1) resolve(`Seeder ${seeder} was integrated`)
                    })
                        .catch(err => reject(err))
                });
            } else {
                connection.createCollection(config.collection)
                    .then(x => {
                        const message = `Collection ${config.collection} was created`;
                        console.log(message);
                        Files.binnacleLog(message);
                    })
                    .catch(y => {
                        const message = `Collection ${config.collection} exists`;
                        console.log(`Collection ${config.collection} exists`);
                        Files.errorLog(message);
                        Files.binnacleLog(message);
                    });
            }
        });
    }
    private async Collection() {
        await this.Create(this.users[0], this.users[1].config, 'email', this.users[1].seed)
            .then(x => {
                console.log(x);
                Files.binnacleLog(`${x}`);
            })
            .catch(err => {
                const message = `An error while ocurred verifying ${this.users[1].config.collection}, ${err}`;
                console.log(message);
                Files.errorLog(message);
                Files.binnacleLog(message);
            });

        await this.Create(this.views[0], this.views[1].config, 'name', this.views[1].seed)
            .then(x => {
                console.log(x);
                Files.binnacleLog(`${x}`);
            })
            .catch(err => {
                const message = `An error while ocurred verifying, ${err}`;
                console.log(message);
                Files.errorLog(message);
                Files.binnacleLog(message);
            });
        await this.Create(this.mailProcess[0], this.mailProcess[1].config, null, this.mailProcess[1].seed)
            .then(x => {
                console.log(x);
                Files.binnacleLog(`${x}`);
            })
            .catch(err => {
                const message = `An error while ocurred verifying, ${err}`;
                console.log(message);
                Files.errorLog(message);
                Files.binnacleLog(message);
            });
    }
}

const initializedContext = new DBContext(
    Users,
    Views,
    MailProcess
);
export { initializedContext };