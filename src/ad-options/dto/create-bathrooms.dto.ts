import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBathroomsDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
