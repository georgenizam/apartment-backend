import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { RefreshSessionsService } from '../refresh-sessions/refresh-sessions.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenPayload, RefreshTokenPayload, Tokens } from './types/token.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService,
        private refreshSessionsService: RefreshSessionsService
    ) {}

    async login(loginDto: LoginDto, fingerprint: string, ua: string, ip: string) {
        const user = await this.validateUser(loginDto);
        const sid = uuidv4();

        const { accessToken, refreshToken } = await this.getTokens(
            { userId: user._id.toString(), email: user.email, roles: user.roles },
            { sid }
        );
        await this.refreshSessionsService.addSession({
            userId: user._id.toString(),
            refreshToken,
            ua,
            fingerprint,
            ip,
        });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async register(registerDto: RegisterDto, fingerprint: string, ua: string, ip: string) {
        const { email, password } = registerDto;
        const candidate = await this.usersService.getUserByEmail(email);

        if (candidate) {
            throw new BadRequestException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
        });

        const sid = uuidv4();

        const { accessToken, refreshToken } = await this.getTokens(
            { userId: user._id.toString(), email: user.email, roles: user.roles },
            { sid }
        );

        await this.refreshSessionsService.addSession({
            userId: user._id.toString(),
            refreshToken,
            ua,
            fingerprint,
            ip,
        });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async logout(refreshToken: string): Promise<void> {
        return this.refreshSessionsService.removeSessionByRefreshToken(refreshToken);
    }

    async refresh(userId: string, fingerprint: string, ua: string, ip: string): Promise<Tokens> {
        const user = await this.usersService.getUserById(userId);
        const sid = uuidv4();

        const { accessToken, refreshToken } = await this.getTokens(
            { userId, email: user.email, roles: user.roles },
            { sid }
        );
        await this.refreshSessionsService.addSession({
            userId: user._id.toString(),
            refreshToken,
            ua,
            fingerprint,
            ip,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private async getAccessToken(accessTokenPayload: AccessTokenPayload): Promise<string> {
        const secret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');
        const expiresIn = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');

        return this.jwtService.sign(accessTokenPayload, { secret, expiresIn });
    }

    private async getRefreshToken(refreshTokenPayload: RefreshTokenPayload): Promise<string> {
        const secret = this.configService.get('JWT_REFRESH_TOKEN_SECRET');
        const expiresIn = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');

        return this.jwtService.sign(refreshTokenPayload, { secret, expiresIn });
    }

    async getTokens(
        accessTokenPayload: AccessTokenPayload,
        refreshTokenPayload: RefreshTokenPayload
    ): Promise<Tokens> {
        const accessToken = await this.getAccessToken(accessTokenPayload);
        const refreshToken = await this.getRefreshToken(refreshTokenPayload);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async validateUser(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('Not found user');
        }
        const isEquals = await bcrypt.compare(password, user.password);

        if (user && isEquals) {
            return user;
        }

        throw new UnauthorizedException('Invalid email or password');
    }
}
