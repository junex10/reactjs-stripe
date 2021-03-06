export {
    MailDTO,
    MailFilesDTO,
    MailNotificationServiceDTO
} from './requests/Mail.dto';
export {
    GetClientsDTO
} from './requests/GetClients.dto';

export { 
    AuthUsersDTO,
    AuthUserSavedDTO,
    RegisterUserDTO,
    EditUserEmailDTO,
    EditUserPasswordDTO,
    AddCardDTO,
    DecodeTokenDTO
} from './resources/AuthUsers.dto';
export {
    GetUsersDTO,
    GetUserByIdDTO,
    GetUserByEmailDTO
} from './resources/GetUsers.dto';
export { 
    UpdatePhoneDTO, 
    UpdateNamesDTO,
    UpdateCreditCard
} from './resources/UpdatePerson.dto';
export {
    GetStock,
    RegisterStock,
    UpdateStock,
    GetCategory,
    NewCategoryDTO
} from './resources/GetShopping.dto';
export {
    GetSpentDTO
} from './resources/GetSpent.dto';
export {
    GetCartDTO,
    AddCartDTO
} from './resources/GetCart.dto';
export {
    NewSaleDTO,
    GetSaleDTO
} from './resources/Sales.dto'