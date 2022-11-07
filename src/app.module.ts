import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsModule } from './ads/ads.module';
import { AdOptionsModule } from './ad-options/ad-options.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AdsModule,
        AdOptionsModule,
    ],
})
export class AppModule {}
