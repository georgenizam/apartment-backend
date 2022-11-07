import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacilitiesDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
