import { Schema, model, Types } from 'mongoose';
import { Entity } from './../../interfaces/entities/Entity';

const EntitySchema = new Schema<Entity>({
    createdBy: { type: Number },
    createDate: { type: Date },
    updatedBy: { type: Number },
    updateDate: { type: Date },
    deleteDate: { type: Date },
    deletedBy: { type: Number },
    deleted: Boolean
});

export default { EntitySchema };