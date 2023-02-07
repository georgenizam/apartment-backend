import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Ip,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ms from 'ms';
import { Cookies } from '../decorators/cookies.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenJwtAuthGuard } from './guard/RefreshToken.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService: ConfigService) {}

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Req() req,
        @Res({ passthrough: true }) res,
        @Ip() ip: string,
        @Headers('User-Agent') userAgent,
        @Body() loginDto: LoginDto
    ) {
        const fingerprint = req.fingerprint.hash ?? '';

        const { refreshToken, ...otherProps } = await this.authService.login(
            loginDto,
            fingerprint,
            userAgent,
            ip
        );
        const maxAge = +ms(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'));

        res.cookie('refreshToken', refreshToken, {
            path: '/api/auth',
            httpOnly: true,
            maxAge,
        });

        return {
            ...otherProps,
            refreshToken,
        };
    }

    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
    @Post('register')
    async register(
        @Req() req,
        @Res({ passthrough: true }) res,
        @Ip() ip: string,
        @Headers('User-Agent') userAgent,
        @Body() registerDto: RegisterDto
    ) {
        const fingerprint = req.fingerprint.hash ?? '';

        const { refreshToken, ...otherProps } = await this.authService.register(
            registerDto,
            fingerprint,
            userAgent,
            ip
        );
        const maxAge = +ms(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'));

        res.cookie('refreshToken', refreshToken, {
            path: '/api/auth',
            httpOnly: true,
            maxAge,
        });

        return {
            ...otherProps,
            refreshToken,
        };
    }

    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    // @ApiCookieAuth()
    @UseGuards(RefreshTokenJwtAuthGuard)
    @Get('refresh')
    async refresh(@Req() req, @Res() res, @Ip() ip, @Headers('User-Agent') userAgent) {
        const fingerprint = req.fingerprint.hash ?? '';

        const userId = req.user.userId;
        const { accessToken, refreshToken } = await this.authService.refresh(
            userId,
            fingerprint,
            userAgent,
            ip
        );
        const maxAge = +ms(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'));

        res.cookie('refreshToken', refreshToken, {
            path: '/api/auth',
            httpOnly: true,
            maxAge,
        });

        res.send({
            accessToken,
            refreshToken,
        });
    }

    @UseGuards(RefreshTokenJwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('logout')
    async logout(@Req() req, @Res() res, @Cookies('refreshToken') refreshToken: string) {
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken', {
            path: '/api/auth',
            httpOnly: true,
        });
        res.send();
    }
}
