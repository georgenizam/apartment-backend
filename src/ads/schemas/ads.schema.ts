import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Elevator } from '../../ad-options/schemas/elevator.schema';
import { AdType } from '../../ad-options/schemas/ad-type.schema';
import { ApartmentsType } from '../../ad-options/schemas/apartments-type.schema';
import { Bedrooms } from '../../ad-options/schemas/bedrooms.schema';
import { Bathrooms } from '../../ad-options/schemas/bathrooms.schema';
import { Facilities } from '../../ad-options/schemas/facilities.schema';

export type AdDocument = Ad & Document;

@Schema({
    versionKey: false,
    timestamps: true,
    discriminatorKey: '__t',
})
export class Ad {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: AdType.name })
    adType: AdType;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: ApartmentsType.name })
    apartmentsType: ApartmentsType;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    desc: string;

    @Prop({ default: [] })
    images: string[];

    @Prop({ required: true })
    floor: number;

    @Prop({ required: true })
    floorsBuilding: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Elevator.name })
    elevator: Elevator;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Bedrooms.name })
    bedrooms: Bedrooms;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Bathrooms.name })
    bathrooms: Bathrooms;

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Facilities.name }],
    })
    facilities: Facilities[];

    @Prop({ required: true })
    yearBuilding: Date;

    @Prop({ required: true })
    square: number;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    address: string;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
