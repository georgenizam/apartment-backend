import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type ElevatorDocument = Elevator & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Elevator {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id elevator' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'Elevator', description: 'label', required: true })
    @Prop({ required: true })
    label: string;

    @ApiProperty({ example: 'yes', description: 'value', required: true })
    @Prop({ required: true })
    value: string;
}

export const ElevatorSchema = SchemaFactory.createForClass(Elevator);
