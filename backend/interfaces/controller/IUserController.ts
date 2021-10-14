export interface IUserController {
    GetUsers(req, res): Promise<void>;
    GetUserById(req, res): Promise<void>;
    AuthUser(req, res): Promise<void>;
    RegisterUser(req, res): Promise<void>;
    UpdatePhone(req, res): Promise<void>;
    UpdateNames(req, res): Promise<void>;
    UpdateEmail(req, res): Promise<void>;
    UpdatePassword(req, res): Promise<void>;
}