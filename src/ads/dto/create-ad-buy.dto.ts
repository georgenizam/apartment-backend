import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAdDto } from './create-ad.dto';
import { Type } from 'class-transformer';

export class CreateAdBuyDto extends CreateAdDto {
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    price: number;
}
