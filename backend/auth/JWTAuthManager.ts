import * as jwt from 'jsonwebtoken';
import { Utility } from './../utilitys/Utility';
import { currentUserCreated } from './../commons/config';
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
    public authToken(tokenJWT: string, control?: string) {
        new Utility().AppSettingsJson()
            .then((x: IAPPSettings) => {
                const tokenFormat = tokenJWT.replace('Bearer ', '');
                const key = x.Jwt.Key;
                const userData = jwt.verify(tokenFormat, key);
                const access = userData.profile.access;

                let way = false;
                access.map((val: any) => {
                    console.log(val, control)
                    if (val.view === 'all') way = true; // Admin
                    else if(val.view === control) way = true; // Any other user
                })
                return way
            })
    }
    private buildTokenBasedUser(data) {
        this.userData = {
            user: data.email,
            token: data.token
        }
        return this.userData;
    }
}