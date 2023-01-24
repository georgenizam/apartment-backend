import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'username', description: 'username', required: true })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'email', required: true })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345678', description: 'password', required: true })
    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password: string;

    @ApiProperty({ example: '+79999999999', description: 'phone', required: true })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ example: '', description: 'avatar file', required: false })
    @IsString()
    @IsOptional()
    avatarSrc: string;
}
