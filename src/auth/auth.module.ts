import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshSessionsModule } from '../refresh-sessions/refresh-sessions.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategy/AccessToken.strategy';
import { RefreshTokenStrategy } from './strategy/RefreshToken.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    imports: [UsersModule, ConfigModule, JwtModule.register({}), RefreshSessionsModule],
    exports: [AuthService],
})
export class AuthModule {}
