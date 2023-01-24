import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshSessionsDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    @IsString()
    @IsNotEmpty()
    ua: string;

    @IsString()
    @IsNotEmpty()
    fingerprint: string;

    @IsString()
    @IsNotEmpty()
    ip: string;
}
