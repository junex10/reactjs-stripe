import { GetUsersDTO, GetUserByIdDTO } from "../../dtos/resources/getUsers.dto";
import { AuthUsersDTO, AuthUserSavedDTO } from "../../dtos/resources/AuthUsers.dto";
export interface IUserBLL {
    GetUsers(): Promise<GetUsersDTO[]>;
    GetUserById(id: string): Promise<GetUserByIdDTO>;
    AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO>;
}