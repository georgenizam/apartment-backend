import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApartmentsTypeDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
