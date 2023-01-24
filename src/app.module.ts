import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AdOptionsModule } from './ad-options/ad-options.module';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { getMongoConfig } from './configs/mongo.config';
import { RefreshSessionsModule } from './refresh-sessions/refresh-sessions.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AdsModule,
        AdOptionsModule,
        CloudinaryModule,
        AuthModule,
        UsersModule,
        RefreshSessionsModule,
        CommandModule,
    ],
})
export class AppModule {}
