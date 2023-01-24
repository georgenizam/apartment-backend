import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdTypeDto {
    @ApiProperty({ example: 'Rent', description: 'label', required: true })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ example: 'rent', description: 'value', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;
}
