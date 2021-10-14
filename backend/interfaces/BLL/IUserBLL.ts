import { 
    GetUsersDTO, 
    GetUserByIdDTO, 
    AuthUsersDTO, 
    AuthUserSavedDTO,
    RegisterUserDTO
} from "../../dtos/dtos.module";

export interface IUserBLL {
    GetUsers(): Promise<GetUsersDTO[]>;
    GetUserById(id: string): Promise<GetUserByIdDTO>;
    AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO>;
    RegisterUser(data: RegisterUserDTO): Promise<RegisterUserDTO>;
}