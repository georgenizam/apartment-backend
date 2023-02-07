import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdOptionsModule } from '../ad-options/ad-options.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MediaModule } from '../media/media.module';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdBuy, AdBuySchema } from './schemas/ads-buy.schema';
import { AdRent, AdRentSchema } from './schemas/ads-rent.schema';
import { Ad, AdSchema } from './schemas/ads.schema';
import { AdsSeed } from './seed/ads.seed';

@Module({
    providers: [AdsService, AdsSeed],
    imports: [
        AdOptionsModule,
        CloudinaryModule,
        MediaModule,
        MongooseModule.forFeature([
            {
                name: Ad.name,
                schema: AdSchema,
                discriminators: [
                    { name: AdRent.name, schema: AdRentSchema },
                    { name: AdBuy.name, schema: AdBuySchema },
                ],
            },
        ]),
    ],
    controllers: [AdsController],
    exports: [AdsSeed],
})
export class AdsModule {}
