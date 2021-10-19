import { Schema, model } from 'mongoose';
import EntitySchema from './EntitySchema';
import * as seeder from './../data/seeders/UserSeeder.json';
import { Access, Profile, User, Cards, Person } from './../../interfaces/entities/User';

const Users = new Schema<User>({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profile: { type: new Schema<Profile>({
        role: { type: String },
        access: [new Schema<Access>({
            view: { type: String }
        }, { _id : false })]
    }, { _id : false }), required: true },
    online: { type: Boolean },
    cards: [new Schema<Cards>({
        keyCardNumber: { type: String, required: true, unique: true},
        cvc: { type: Number, required: true },
        expirationDate: { type: String, required: true }
    }, { _id: false })],
    person: { type: new Schema<Person>({
        name: { type: String, required: true},
        lastname: { type: String, required: true},
        phone: { type: String },
        areaCode: { type: String }
    }, { _id: false })}
})
.add(EntitySchema.EntitySchema);
const schema = model<User>(seeder.config.collection, Users);

export default { schema, seeder };