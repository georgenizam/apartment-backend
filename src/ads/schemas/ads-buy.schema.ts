import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Ad } from './ads.schema';

export type AdBuyDocument = AdBuy & Document & Ad;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdBuy extends Ad {
    @ApiProperty({ example: '1000', description: 'price', required: true })
    @Prop({ required: true })
    price: number;
}

export const AdBuySchema = SchemaFactory.createForClass(AdBuy);
