import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type FacilitiesDocument = Facilities & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Facilities {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id facilities' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'Facilities', description: 'label', required: true })
    @Prop({ required: true })
    label: string;

    @ApiProperty({ example: 'TV', description: 'value', required: true })
    @Prop({ required: true })
    value: string;
}

export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
