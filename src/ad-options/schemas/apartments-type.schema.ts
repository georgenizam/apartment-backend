import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ApartmentsTypeDocument = ApartmentsType & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class ApartmentsType {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const ApartmentsTypeSchema = SchemaFactory.createForClass(ApartmentsType);
