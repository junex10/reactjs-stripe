import * as jwt from 'jsonwebtoken';
import { Utility } from './../utilitys/Utility';

export class JWTAuthManager {

    userToken: any;
    userData: any;
    token: any;
    key: string;

    constructor(

    ) {

    }
    public buildToken(userData) {
        return new Promise( async (resolve, reject) => {
            const settings = await import(`./../${Utility.AppSettings}`)
            .then(x => {
                this.key = x.Jwt.Key;
                this.token = jwt.sign(userData, this.key, {
                    expiresIn: 60 * 60 * 24,
                    algorithm: "HS256"
                });
                this.token = this.buildTokenBasedUser({email: userData.email, token: this.token});
                resolve(this.token);
            });
        });
    }
    public authToken(tokenJWT) {
        const userData = jwt.verify(tokenJWT, this.key);
        return (this.key == userData.key) ? true : false;
    }
    private buildTokenBasedUser(data) {
        this.userData = {
            user: data.email,
            token: data.token
        }
        return this.userData;
    }
}