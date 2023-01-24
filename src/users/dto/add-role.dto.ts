import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDto {
    @ApiProperty({ example: 'admin', description: 'value role', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;

    @ApiProperty({ example: '63c82b440a93570d60997513', description: 'user id', required: true })
    @IsString()
    @IsNotEmpty()
    userId: string;
}
