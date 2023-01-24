import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class GetAllQueryDto extends PaginationQueryDto {
    @ApiProperty({ example: 'Apartments in moscow', description: 'search string', required: false })
    @IsOptional()
    @IsString()
    search?: string = '';

    @ApiProperty({
        example: ['rent', 'buy'],
        description: 'Ad type value',
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    adType?: string[];

    @ApiProperty({
        example: ['apartment', 'house'],
        description: 'Apartments type value',
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    apartmentsType?: string[];

    @ApiProperty({
        example: ['3', '5+'],
        description: 'Bedrooms value',
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    bedrooms?: string[];

    @ApiProperty({ example: '1000', description: 'Buy price min', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    priceMin?: number = 0;

    @ApiProperty({ example: '1000000000', description: 'Buy price max', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    priceMax?: number = 1000000000;

    @ApiProperty({ example: '1000', description: 'Rent price rent min', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    priceRentMin?: number = 0;

    @ApiProperty({ example: '1000000000', description: 'Rent price max', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    priceRentMax?: number = 1000000000;

    @ApiProperty({ example: '1000', description: 'Rent deposit min', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    depositMin?: number = 0;

    @ApiProperty({ example: '1000000000', description: 'Rent deposit max', required: false })
    @IsOptional()
    @Min(0)
    @Max(1000000000)
    @Type(() => Number)
    @IsNumber()
    depositMax?: number = 1000000000;
}
