import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AdTypeDocument = AdType & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdType {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const AdTypeSchema = SchemaFactory.createForClass(AdType);
