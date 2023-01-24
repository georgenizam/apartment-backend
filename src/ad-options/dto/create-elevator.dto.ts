import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateElevatorDto {
    @ApiProperty({ example: 'Elevator', description: 'label', required: true })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty({ example: 'yes', description: 'value', required: true })
    @IsString()
    @IsNotEmpty()
    value: string;
}
