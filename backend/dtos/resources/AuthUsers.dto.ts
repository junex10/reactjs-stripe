import { Cards, Permits, Person, Profile } from "../../interfaces/entities/User";

export class AuthUsersDTO{
    email: string;
    password: string;
}
export class AuthUserSavedDTO{
    user: string;
    token: string;
}
export class RegisterUserDTO{
    email: string;
    password: string;
    repeat_password: string;
    userType?: string;
    person: Person;
}
export class EditUserEmailDTO{
    email: string;
    newEmail: string;
}
export class EditUserPasswordDTO{
    email: string;
    newPassword: string;
}
export class AddCardDTO{
    email: string;
    creditCardNumber: string;
    cvc: number;
    expirationDate: string;
}
export class DecodeTokenDTO{
    email: string;
    profile: Profile;
    permits: Permits;
    person: Person;
    cards?: Cards;
    id: string;
    client: string;
    iat: number;
    exp: number;
}