import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdOptionsController } from './ad-options.controller';
import { AdOptionsService } from './ad-options.service';
import { AdType, AdTypeSchema } from './schemas/ad-type.schema';
import { ApartmentsType, ApartmentsTypeSchema } from './schemas/apartments-type.schema';
import { Bathrooms, BathroomsSchema } from './schemas/bathrooms.schema';
import { Bedrooms, BedroomsSchema } from './schemas/bedrooms.schema';
import { Elevator, ElevatorSchema } from './schemas/elevator.schema';
import { Facilities, FacilitiesSchema } from './schemas/facilities.schema';
import { AdOptionsSeed } from './seed/ad-options.seed';

@Module({
    controllers: [AdOptionsController],
    providers: [AdOptionsService, AdOptionsSeed],
    imports: [
        MongooseModule.forFeature([{ name: AdType.name, schema: AdTypeSchema }]),
        MongooseModule.forFeature([{ name: ApartmentsType.name, schema: ApartmentsTypeSchema }]),
        MongooseModule.forFeature([{ name: Bedrooms.name, schema: BedroomsSchema }]),
        MongooseModule.forFeature([{ name: Bathrooms.name, schema: BathroomsSchema }]),
        MongooseModule.forFeature([{ name: Elevator.name, schema: ElevatorSchema }]),
        MongooseModule.forFeature([{ name: Facilities.name, schema: FacilitiesSchema }]),
    ],
    exports: [AdOptionsService, AdOptionsSeed],
})
export class AdOptionsModule {}
