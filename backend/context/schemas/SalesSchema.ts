import { Schema, model } from 'mongoose';
import * as seeder from './../data/seeders/SalesSeeder.json';
import { Sales, SaleInfo } from './../../interfaces/entities/Index';

const SalesSchema = new Schema<Sales>({
    sale: new Schema<SaleInfo>({
        
    }, { _id: false })
}, { collection: seeder.config.collection})

const schema = model<Sales>(seeder.config.collection, SalesSchema);

export default { schema, seeder };