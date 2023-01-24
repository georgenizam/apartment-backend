import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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
}
