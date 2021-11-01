import { 
    GetUsersDTO, 
    GetUserByIdDTO, 
    AuthUsersDTO, 
    AuthUserSavedDTO,
    RegisterUserDTO,
    UpdatePhoneDTO,
    UpdateNamesDTO,
    UpdateCreditCard,
    EditUserEmailDTO,
    EditUserPasswordDTO,
    GetUserByEmailDTO
} from "../../dtos/dtos.module";

export interface IUserBLL {
    GetUsers(): Promise<GetUsersDTO[]>;
    GetUserById(id: string): Promise<GetUserByIdDTO>;
    AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO>;
    RegisterUser(data: RegisterUserDTO): Promise<Object>;
    UpdatePhone(data: UpdatePhoneDTO): Promise<UpdatePhoneDTO>;
    UpdateNames(data: UpdateNamesDTO): Promise<UpdateNamesDTO>;
    UpdateEmail(data: EditUserEmailDTO): Promise<EditUserEmailDTO>;
    UpdatePassword(data: EditUserPasswordDTO): Promise<Object>;
    UpdateCreditCard(data: UpdateCreditCard): Promise<Object>;
    NewUser(data: RegisterUserDTO): Promise<AuthUserSavedDTO>;
    GetUserByEmail(data: string): Promise<GetUserByEmailDTO>;
}