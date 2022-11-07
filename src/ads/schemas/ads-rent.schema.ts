import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ad } from './ads.schema';

export type AdRentDocument = AdRent & Document & Ad;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdRent extends Ad {
    @Prop({ required: true })
    priceRent: number;

    @Prop({ required: true })
    deposit: number;
}

export const AdRentSchema = SchemaFactory.createForClass(AdRent);
