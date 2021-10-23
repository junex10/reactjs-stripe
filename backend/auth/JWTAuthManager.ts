import * as jwt from 'jsonwebtoken';
import { Utility } from './../utilitys/Utility';
import { IAPPSettings } from '../interfaces/IAPPSettings';

export class JWTAuthManager {

    userToken: any;
    userData: any;
    token: any;
    key: string;

    constructor(

    ) {

    }
    public buildToken(userData) {
        return new Promise(async (resolve, reject) => {
            await import(`./../${Utility.AppSettings}`)
                .then((x: IAPPSettings) => {
                    this.key = x.Jwt.Key;
                    this.token = jwt.sign(userData, this.key, {
                        expiresIn: 60 * 60 * 24,
                        algorithm: "HS256"
                    });
                    this.token = this.buildTokenBasedUser({ email: userData.email, token: this.token });
                    resolve(this.token);
                });
        });
    }
    public authToken(tokenJWT: string, configAccess: any) {
        return new Promise((resolve, reject) => {
            new Utility().AppSettingsJson()
                .then((x: IAPPSettings) => {
                    if (tokenJWT !== undefined) {
                        try {
                            const tokenFormat = tokenJWT.replace('Bearer ', '');
                            const key = x.Jwt.Key;
                            const userData = jwt.verify(tokenFormat, key);
                            const role = userData.profile.role;

                            let way = false;

                            if (role !== 'Administrador') {
                                userData.permits.keys.map((val: any) => {
                                    if (val.name === configAccess.module) val.control.find(x => x === configAccess.control ? way = true : way = false);
                                });
                            } else way = true;

                            way == true ? resolve(way) : reject({ status: 403, message: 'Restricted action' });
                        } 
                        catch (err) {
                            reject({ status: 500, message: err })
                        }
                    } else {
                        reject({ status: 403, message: 'Required authorization token' });
                    }
                });
        });
    }
    private buildTokenBasedUser(data) {
        this.userData = {
            user: data.email,
            token: data.token
        }
        return this.userData;
    }
}