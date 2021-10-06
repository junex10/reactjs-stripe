import { Schema, model } from 'mongoose';
import * as seeder from './../data/seeders/ViewSeeder.json';
import { Views } from '../../interfaces/entities/Views';

const Users = new Schema<Views>({
    name: { type: String, required: true, unique: true }
})
const schema = model<Views>(seeder.config.collection, Users);

export default { schema, seeder };
