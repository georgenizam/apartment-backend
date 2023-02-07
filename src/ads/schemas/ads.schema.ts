import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { AdType } from '../../ad-options/schemas/ad-type.schema';
import { ApartmentsType } from '../../ad-options/schemas/apartments-type.schema';
import { Bathrooms } from '../../ad-options/schemas/bathrooms.schema';
import { Bedrooms } from '../../ad-options/schemas/bedrooms.schema';
import { Elevator } from '../../ad-options/schemas/elevator.schema';
import { Facilities } from '../../ad-options/schemas/facilities.schema';

export type AdDocument = Ad & Document;

@Schema({
    versionKey: false,
    timestamps: false,
})
class Media {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    mimetype: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

@Schema({
    versionKey: false,
    timestamps: true,
    discriminatorKey: '__t',
})
export class Ad {
    @ApiProperty({ example: '63b729dbdd463eae53e3e133', description: 'Ad id', required: true })
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: AdType.name })
    adType: AdType;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: ApartmentsType.name })
    apartmentsType: ApartmentsType;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    desc: string;

    @Prop({ type: [MediaSchema], default: [] })
    media: Media[];

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

AdSchema.index(
    {
        title: 'text',
        desc: 'text',
        country: 'text',
        city: 'text',
        street: 'text',
        address: 'text',
    },
    {
        name: 'search_text_index',
        weights: { title: 1, desc: 1, country: 2, city: 3, street: 4, address: 5 },
    }
);
