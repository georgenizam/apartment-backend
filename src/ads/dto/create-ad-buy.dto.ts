import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAdDto } from './create-ad.dto';

export class CreateAdBuyDto extends CreateAdDto {
    @IsNumber()
    @IsNotEmpty()
    price: number;
}
