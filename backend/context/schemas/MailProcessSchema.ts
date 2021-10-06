import { Schema, model } from 'mongoose';
import EntitySchema from './EntitySchema';
import * as seeder from './../data/seeders/MailProcessSeeder.json';
import { MailProcess } from './../../interfaces/entities/Index';

const MailProcessA = new Schema<MailProcess>({
    mailAddress: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, required: true },
    files: { type: String },
    service: { type: String, required: true }
}, { collection: seeder.config.collection})
.add(EntitySchema.EntitySchema);
const schema = model<MailProcess>(seeder.config.collection, MailProcessA);
export default { schema, seeder };