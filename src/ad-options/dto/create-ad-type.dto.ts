import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdTypeDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
