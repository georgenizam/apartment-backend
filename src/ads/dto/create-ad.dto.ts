import {
    IsArray,
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAdDto {
    @IsString()
    @IsNotEmpty()
    adType: string;

    @IsString()
    @IsNotEmpty()
    apartmentsType: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    desc: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    floor: number;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    floorsBuilding: number;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    yearBuilding: Date;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    square: number;

    @IsString()
    @IsNotEmpty()
    elevator: string;

    @IsString()
    @IsNotEmpty()
    bedrooms: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    facilities: string[];

    @IsString()
    @IsNotEmpty()
    bathrooms: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    price: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    priceRent: number;
    // rentPeriod: null;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    deposit: number;
}
