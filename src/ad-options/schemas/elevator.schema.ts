import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ElevatorDocument = Elevator & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Elevator {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;
}

export const ElevatorSchema = SchemaFactory.createForClass(Elevator);
