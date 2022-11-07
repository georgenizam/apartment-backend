import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BedroomsDocument = Bedrooms & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Bedrooms {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const BedroomsSchema = SchemaFactory.createForClass(Bedrooms);
