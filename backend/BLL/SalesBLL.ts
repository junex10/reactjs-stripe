import Sales from './../context/schemas/SalesSchema';
import { ISalesBLL } from "../interfaces/BLL/ISalesBLL";

import {
    GetSpentDTO
} from './../dtos/dtos.module';

export class SalesBLL implements ISalesBLL {
    constructor() { }

    public GetSpent(spent: string): Promise<GetSpentDTO> {
        return new Promise((resolve, reject) => {
            
        });
    }
}