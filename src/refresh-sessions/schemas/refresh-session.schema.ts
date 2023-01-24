import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RefreshSessionDocument = RefreshSession & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class RefreshSession {
    _id: mongoose.Types.ObjectId | string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    refreshToken: string;

    @Prop({ required: true })
    ua: string;

    @Prop({ required: true })
    fingerprint: string;

    @Prop({ required: true })
    ip: string;

    @Prop({ type: Date, default: () => new Date(), expires: 1 })
    expireAt: Date;
}

export const RefreshSessionSchema = SchemaFactory.createForClass(RefreshSession);
