import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAdDto } from './create-ad.dto';
import { Type } from 'class-transformer';

export class CreateAdRentDto extends CreateAdDto {
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    priceRent: number;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    deposit: number;
}
