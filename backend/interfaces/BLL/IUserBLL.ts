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
    GetUserByEmailDTO,
    AddCardDTO,
    AddCartDTO,
    GetClientsDTO
} from "../../dtos/dtos.module";

export interface IUserBLL {
    GetUsers(data: GetClientsDTO): Promise<GetUsersDTO[]>;
    GetUserById(id: string): Promise<GetUserByIdDTO>;
    AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO>;
    RegisterUser(data: RegisterUserDTO): Promise<Object>;
    UpdatePhone(data: UpdatePhoneDTO): Promise<UpdatePhoneDTO>;
    UpdateNames(data: UpdateNamesDTO): Promise<UpdateNamesDTO>;
    UpdateEmail(data: EditUserEmailDTO): Promise<EditUserEmailDTO>;
    UpdatePassword(data: EditUserPasswordDTO): Promise<Object>;
    UpdateCreditCard(data: UpdateCreditCard): Promise<Object>;
    NewUser(data: RegisterUserDTO): Promise<AuthUserSavedDTO>;
    GetUserByEmail(data: string, way: string): Promise<GetUserByEmailDTO | AuthUserSavedDTO>;
    AddCard(data: AddCardDTO): Promise<AddCardDTO>;
    AddCart(data: AddCartDTO): Promise<AddCartDTO>;
    DecodeToken(token: string): Promise<any>;
}