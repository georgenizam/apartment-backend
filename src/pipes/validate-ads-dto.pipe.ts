import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAdBuyDto } from '../ads/dto/create-ad-buy.dto';
import { CreateAdRentDto } from '../ads/dto/create-ad-rent.dto';

@Injectable()
export class ValidateAdsDtoPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        let transformed: CreateAdBuyDto | CreateAdRentDto;

        if (!value.price && !value.priceRent) {
            throw new BadRequestException('Invalid ad dto');
        }

        if (value.price) {
            transformed = plainToInstance(CreateAdBuyDto, value);
        }
        if (value.priceRent) {
            transformed = plainToInstance(CreateAdRentDto, value);
        }

        const validation = await validate(transformed);
        if (validation.length > 0) {
            const validationPipe = new ValidationPipe();
            const exceptionFactory = validationPipe.createExceptionFactory();
            throw exceptionFactory(validation);
        }

        return transformed;
    }
}
