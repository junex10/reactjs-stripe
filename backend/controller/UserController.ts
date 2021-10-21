import { IUserBLL } from "../interfaces/BLL/IUserBLL";
import { IUserController } from "../interfaces/controller/IUserController"
import { JWTAuthManager } from "../auth/JWTAuthManager";

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
        catch(err) {
            res.status(err.status);
            res.send({message: err.message})
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
        catch(err) {
            res.status(err.status);
            res.send({message: err.message})
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
        catch(err) {
            res.status(err.status);
            res.send({message: err.message})
        }
    }
    public async RegisterUser(req, res): Promise<void> {
        this.Auth(req.headers.authorization, { module: 'user', control: 'registerUser' })
        .then(auth => {
            console.log(auth)
        })
        /*try {
            await this.userBusiness.RegisterUser(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            })
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message});
        }*/
    }
    public async UpdatePhone(req, res): Promise<void> {
        try {
            await this.userBusiness.UpdatePhone(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            })
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message});
        }
    }
    public async UpdateNames(req, res): Promise<void> {
        try {
            await this.userBusiness.UpdateNames(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            })
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message});
        }
    }
    public async UpdateEmail(req, res): Promise<void> {
        try {
            await this.userBusiness.UpdateEmail(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            })
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message});
        }
    }
    public async UpdatePassword(req, res): Promise<void> {
        try {
            await this.userBusiness.UpdatePassword(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            })
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message});
        }
    }
    private Auth(token: string, configAccess: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            new JWTAuthManager().authToken(token, configAccess)
        });
    }
}