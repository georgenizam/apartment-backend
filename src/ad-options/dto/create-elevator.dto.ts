import { IsNotEmpty, IsString } from 'class-validator';

export class CreateElevatorDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
