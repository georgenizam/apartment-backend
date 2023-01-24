import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBathroomsDto {
    @ApiProperty({ example: 'Bathrooms', description: 'label', required: true })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ example: '1', description: 'value', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;
}
