import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Role } from '../../auth/types/role.enum';

export type UserDocument = User & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class User {
    @ApiProperty({ example: '63bc9262e8e1e0b36b47988f', description: 'id user' })
    _id: mongoose.Types.ObjectId | string;

    @ApiProperty({ example: 'username', description: 'username' })
    @Prop({ required: true })
    username: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'email' })
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({ example: 'password12345', description: 'password' })
    @Prop({ required: true, minlength: 6, maxlength: 100 })
    password: string;

    @ApiProperty({ example: '+79999999999', description: 'phone' })
    @Prop({ required: true, minlength: 6, maxlength: 20 })
    phone: string;

    @ApiProperty({ example: '', description: 'avatar file src', required: false })
    @Prop({ required: false })
    avatarSrc: string;

    @ApiProperty({ example: 'User', description: 'roles', required: true })
    @Prop({
        required: true,
        type: [{ type: String, enum: Role }],
    })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
