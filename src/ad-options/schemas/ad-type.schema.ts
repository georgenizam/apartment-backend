import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type AdTypeDocument = AdType & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class AdType {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id ad-type' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'Rent', description: 'label', required: true })
    @Prop({ required: true })
    label: string;

    @ApiProperty({ example: 'rent', description: 'value', required: true })
    @Prop({ required: true })
    value: string;
}

export const AdTypeSchema = SchemaFactory.createForClass(AdType);
