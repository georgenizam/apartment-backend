import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
    @ApiProperty({ example: '1', description: 'page number', required: false })
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    page?: number = 1;

    @ApiProperty({ example: '10', description: 'limit items on page', required: false })
    @IsOptional()
    @Max(100)
    @Min(1)
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    limit?: number = 10;
}
