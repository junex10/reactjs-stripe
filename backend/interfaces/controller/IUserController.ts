export interface IUserController {
    GetUsers(req, res): Promise<void>;
    GetUserById(req, res): Promise<void>;
    AuthUser(req, res): Promise<void>;
}