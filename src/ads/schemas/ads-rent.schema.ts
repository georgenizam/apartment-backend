import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Ad } from './ads.schema';

export type AdRentDocument = AdRent & Document & Ad;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdRent extends Ad {
    @ApiProperty({ example: '1000', description: 'Rent price', required: true })
    @Prop({ required: true })
    priceRent: number;

    @ApiProperty({ example: '1000', description: 'deposit', required: true })
    @Prop({ required: true })
    deposit: number;
}

export const AdRentSchema = SchemaFactory.createForClass(AdRent);
