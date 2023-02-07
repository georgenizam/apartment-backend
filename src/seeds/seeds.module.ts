import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AdOptionsModule } from '../ad-options/ad-options.module';
import { AdsModule } from '../ads/ads.module';
import { UsersModule } from '../users/users.module';
import { SeedsService } from './seeds.service';

@Module({
    imports: [CommandModule, AdOptionsModule, AdsModule, UsersModule],
    providers: [SeedsService],
})
export class SeedsModule {}
