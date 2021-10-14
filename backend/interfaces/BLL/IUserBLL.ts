import { 
    GetUsersDTO, 
    GetUserByIdDTO, 
    AuthUsersDTO, 
    AuthUserSavedDTO,
    RegisterUserDTO,
    UpdatePhoneDTO,
    UpdateNamesDTO,
    EditUserEmailDTO,
    EditUserPasswordDTO
} from "../../dtos/dtos.module";

export interface IUserBLL {
    GetUsers(): Promise<GetUsersDTO[]>;
    GetUserById(id: string): Promise<GetUserByIdDTO>;
    AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO>;
    RegisterUser(data: RegisterUserDTO): Promise<RegisterUserDTO>;
    UpdatePhone(data: UpdatePhoneDTO): Promise<UpdatePhoneDTO>;
    UpdateNames(data: UpdateNamesDTO): Promise<UpdateNamesDTO>;
    UpdateEmail(data: EditUserEmailDTO): Promise<EditUserEmailDTO>;
    UpdatePassword(data: EditUserPasswordDTO): Promise<Object>;
}