import {
    GetSpentDTO
} from "../../dtos/dtos.module";
export interface ISalesBLL{
    GetSpent(spent: string): Promise<GetSpentDTO>;
}