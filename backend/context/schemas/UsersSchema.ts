import { Schema, model } from 'mongoose';
import EntitySchema from './EntitySchema';
import * as seeder from './../data/seeders/UserSeeder.json';
import { Access, Profile, User } from './../../interfaces/entities/User';

const Users = new Schema<User>({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profile: { type: new Schema<Profile>({
        role: { type: String },
        access: [new Schema<Access>({
            view: { type: String },
            controlName: { type: String }
        }, { _id : false })]
    }, { _id : false }), required: true },
    online: { type: Boolean }
})
.add(EntitySchema.EntitySchema);
const schema = model<User>(seeder.config.collection, Users);

export default { schema, seeder };