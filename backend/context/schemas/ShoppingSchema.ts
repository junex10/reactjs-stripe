import { Schema, model } from 'mongoose';
import EntitySchema from './EntitySchema';
import * as seeder from './../data/seeders/ShoppingSeeder.json';
import { Shopping, Promotion } from './../../interfaces/entities/Index';

const ShoppingSchema = new Schema<Shopping>({
    product: { type: String, required: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    promotion: new Schema<Promotion>({
        promotion: { type: String, required: true },
        balance: { type: Number, required: true },
        starDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    }, { _id: false }),
    category: { type: String, required: true},
    image: { type: String}
}, { collection: seeder.config.collection})
.add(EntitySchema.EntitySchema);

const schema = model<Shopping>(seeder.config.collection, ShoppingSchema);

export default { schema, seeder };