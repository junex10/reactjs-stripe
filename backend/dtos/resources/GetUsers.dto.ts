import { Profile } from "../../interfaces/entities/User";

export class GetUsersDTO{
    email: string;
    password: string;
    id?: string;
    profile: Profile
}
export class GetUserByIdDTO{
    email: string;
    password?: string;
    id?: string;
    profile: Profile
}