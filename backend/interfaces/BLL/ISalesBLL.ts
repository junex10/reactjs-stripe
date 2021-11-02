import {
    GetSpentDTO
} from "../../dtos/dtos.module";
export interface ISalesBLL{
    GetSpent(spent: string, email: string): Promise<GetSpentDTO[] | Object>;
}