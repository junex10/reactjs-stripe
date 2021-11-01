import { IUserBLL } from "../interfaces/BLL/IUserBLL";
import { IUserController } from "../interfaces/controller/IUserController";
import { JWTAUTH } from "../commons/config";

export class UserController implements IUserController {

    private readonly userBusiness: IUserBLL;

    constructor(
        userBusiness: IUserBLL
    ) {

        this.userBusiness = userBusiness;
    }
    public async AuthUser(req, res): Promise<void> {
        try {
            await this.userBusiness.AuthUser(req.body)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async GetUsers(req, res): Promise<void> {
        try {
            await this.userBusiness.GetUsers()
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async GetUserById(req, res): Promise<void> {
        try {
            const id = req.params.id;
            await this.userBusiness.GetUserById(id)
                .then(x => {
                    res.status(200);
                    res.send(x);
                });
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async RegisterUser(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'user', control: 'registerUser' })
            .then(async () => {
                try {
                    await this.userBusiness.RegisterUser(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async UpdatePhone(req, res): Promise<void> {
        console.log(req.headers, req.body, ' aqui ');
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'profile', control: 'phone' })
            .then(async () => {
                try {
                    await this.userBusiness.UpdatePhone(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async UpdateNames(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'profile', control: 'names' })
            .then(async () => {
                try {
                    await this.userBusiness.UpdateNames(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async UpdateEmail(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'account', control: 'accountEmail' })
            .then(async () => {
                try {
                    await this.userBusiness.UpdateEmail(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async UpdatePassword(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'account', control: 'accountPassword' })
            .then(async () => {
                try {
                    await this.userBusiness.UpdatePassword(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async UpdateCreditCard(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'account', control: 'creditCard' })
            .then(async () => {
                try {
                    await this.userBusiness.UpdateCreditCard(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message });
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async NewUser(req, res): Promise<void> {
        try {
            await this.userBusiness.NewUser(req.body)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message });
        }
    }
    public async GetUserByEmail(req, res): Promise<void> {
        try {
            const email = req.params.email;
            const way = req.params.type;
            await this.userBusiness.GetUserByEmail(email, way)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message });
        }
    }
}