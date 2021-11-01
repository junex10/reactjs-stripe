import { Cards, Permits, Person, Profile } from "../../interfaces/entities/User";

export class GetUsersDTO{
    email: string;
    password: string;
    id?: string;
    profile: Profile;
    person?: Person;
    permits: Permits;
    cards?: Cards;
}
export class GetUserByIdDTO{
    email: string;
    password?: string;
    id?: string;
    profile: Profile;
    permits: Permits;
    person?: Person;
    cards?: Cards;
}
export class GetUserByEmailDTO{
    email: string;
    password?: string;
    id?: string;
    profile: Profile;
    permits: Permits;
    person?: Person;
    cards?: Cards;
}