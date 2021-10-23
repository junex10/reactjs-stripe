import { Schema, model } from 'mongoose';
import EntitySchema from './EntitySchema';
import * as seeder from './../data/seeders/ShoppingSeeder.json';
import { Shopping } from './../../interfaces/entities/Index';

const ShoppingSchema = new Schema<Shopping>({
    product: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true},
    image: { type: String}
}, { collection: seeder.config.collection})
.add(EntitySchema.EntitySchema);

const schema = model<Shopping>(seeder.config.collection, ShoppingSchema);

export default { schema, seeder };