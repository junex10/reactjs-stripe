import { Schema, model } from 'mongoose';
import * as seeder from './../data/seeders/CategorySeeder.json';
import { Category } from './../../interfaces/entities/Index';

const CategorySchema = new Schema<Category>({
    name: { type: String, required: true}
}, { collection: seeder.config.collection });

const schema = model<Category>(seeder.config.collection, CategorySchema);

export default { schema, seeder };