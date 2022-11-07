import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ad } from './ads.schema';

export type AdBuyDocument = AdBuy & Document & Ad;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdBuy extends Ad {
    @Prop({ required: true })
    price: number;
}

export const AdBuySchema = SchemaFactory.createForClass(AdBuy);
