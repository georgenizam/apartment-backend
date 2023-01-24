import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type ApartmentsTypeDocument = ApartmentsType & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class ApartmentsType {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id apartments-type' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'Apartment', description: 'label', required: true })
    @Prop({ required: true })
    label: string;

    @ApiProperty({ example: 'apartment', description: 'value', required: true })
    @Prop({ required: true })
    value: string;
}

export const ApartmentsTypeSchema = SchemaFactory.createForClass(ApartmentsType);
