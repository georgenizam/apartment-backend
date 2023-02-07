import { Injectable } from '@nestjs/common';
import { AdOptionsService } from '../ad-options.service';
import { adTypes, apartmentsTypes, bathrooms, bedrooms, elevators, facilities } from './data';

@Injectable()
export class AdOptionsSeed {
    constructor(private readonly adOptionsService: AdOptionsService) {}

    async createAdTypes() {
        await Promise.all(
            adTypes.map((adTypeItem) => this.adOptionsService.createAdType(adTypeItem))
        );
    }
    async createApartmentsTypes() {
        await Promise.all(
            apartmentsTypes.map((createApartmentsTypeItem) =>
                this.adOptionsService.createApartmentsType(createApartmentsTypeItem)
            )
        );
    }
    async createBathrooms() {
        await Promise.all(
            bathrooms.map((bathroomsItem) => this.adOptionsService.createBathrooms(bathroomsItem))
        );
    }
    async createBedrooms() {
        await Promise.all(
            bedrooms.map((bedroomsItem) => this.adOptionsService.createBedrooms(bedroomsItem))
        );
    }
    async createElevators() {
        await Promise.all(
            elevators.map((elevatorsItem) => this.adOptionsService.createElevator(elevatorsItem))
        );
    }
    async createFacilities() {
        await Promise.all(
            facilities.map((facilitiesItem) =>
                this.adOptionsService.createFacilities(facilitiesItem)
            )
        );
    }
}
