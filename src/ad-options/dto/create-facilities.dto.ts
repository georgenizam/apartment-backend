import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacilitiesDto {
    @ApiProperty({ example: 'Facilities', description: 'label', required: true })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ example: 'TV', description: 'value', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;
}
