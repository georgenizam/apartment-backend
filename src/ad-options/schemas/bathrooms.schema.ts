import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BathroomsDocument = Bathrooms & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Bathrooms {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const BathroomsSchema = SchemaFactory.createForClass(Bathrooms);
