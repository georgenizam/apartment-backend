import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBedroomsDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
