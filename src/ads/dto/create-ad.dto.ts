import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
