import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type BathroomsDocument = Bathrooms & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Bathrooms {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id bathrooms' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'Bathrooms', description: 'label', required: true })
    @Prop({ required: true })
    label: string;

    @ApiProperty({ example: '1', description: 'value', required: true })
    @Prop({ required: true })
    value: string;
}

export const BathroomsSchema = SchemaFactory.createForClass(Bathrooms);
