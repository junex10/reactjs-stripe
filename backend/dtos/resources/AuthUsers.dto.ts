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
}
export class EditUserEmailDTO{
    email: string;
    newEmail: string;
}
export class EditUserPasswordDTO{
    email: string;
    newPassword: string;
}