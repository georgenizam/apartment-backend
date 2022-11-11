import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from './schemas/ads.schema';
import { AdsController } from './ads.controller';
import { AdOptionsModule } from '../ad-options/ad-options.module';
import { AdRent, AdRentSchema } from './schemas/ads-rent.schema';
import { AdBuy, AdBuySchema } from './schemas/ads-buy.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    providers: [AdsService],
    imports: [
        AdOptionsModule,
        CloudinaryModule,
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
})
export class AdsModule {}
