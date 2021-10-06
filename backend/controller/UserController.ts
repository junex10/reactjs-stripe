import { IUserBLL } from "../interfaces/BLL/IUserBLL";
import { IUserController } from "../interfaces/controller/IUserController"

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
}