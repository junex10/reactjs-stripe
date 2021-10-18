import { Schema, model } from 'mongoose';
import * as seeder from './../data/seeders/SalesSeeder.json';
import { Sales, SaleInfo } from './../../interfaces/entities/Index';

const SalesSchema = new Schema<Sales>({
    sale: [new Schema<SaleInfo>({
        product: { type: String, required: true },
        price: { type: Number, required: true },
        many: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String }
    }, { _id: false })]
}, { collection: seeder.config.collection})

const schema = model<Sales>(seeder.config.collection, SalesSchema);

export default { schema, seeder };