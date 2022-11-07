import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FacilitiesDocument = Facilities & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Facilities {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
