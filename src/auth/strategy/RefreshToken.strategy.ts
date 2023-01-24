import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshSessionsService } from '../../refresh-sessions/refresh-sessions.service';
import { UsersService } from '../../users/users.service';
import { RefreshTokenPayload } from '../types/token.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token-jwt') {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private refreshSessionsService: RefreshSessionsService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.refreshToken;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),

            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: RefreshTokenPayload) {
        const fingerprint = req?.fingerprint?.hash;
        const refreshToken = req?.cookies?.refreshToken;
        const ua = req.headers['user-agent'];

        const session = await this.refreshSessionsService.getSessionByToken(refreshToken);
        if (!session) return;

        const isValidUa = ua === session.ua;
        const isValidDateExpire = new Date() < new Date(session.expireAt);
        const isValidFingerprint = fingerprint === session.fingerprint;

        if (!isValidDateExpire || !isValidUa || !isValidFingerprint) return;

        const user = await this.userService.getUserById(session.userId);

        if (!user) return;

        return { userId: user._id, roles: user.roles };
    }
}
