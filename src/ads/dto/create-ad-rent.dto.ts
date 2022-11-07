import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAdDto } from './create-ad.dto';

export class CreateAdRentDto extends CreateAdDto {
    @IsNumber()
    @IsNotEmpty()
    priceRent: number;

    @IsNumber()
    @IsNotEmpty()
    deposit: number;
}
