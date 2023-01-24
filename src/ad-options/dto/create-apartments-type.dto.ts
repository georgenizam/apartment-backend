import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApartmentsTypeDto {
    @ApiProperty({ example: 'Apartment', description: 'label', required: true })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ example: 'apartment', description: 'value', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;
}
