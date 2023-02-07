import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { AdOptionsSeed } from '../ad-options/seed/ad-options.seed';
import { AdsSeed } from '../ads/seed/ads.seed';
import { UsersSeed } from '../users/seed/users.seed';

@Injectable()
export class SeedsService {
    constructor(
        private adOptionsSeed: AdOptionsSeed,
        private adsSeed: AdsSeed,
        private usersSeed: UsersSeed
    ) {}

    @Command({
        command: 'create:ad-types',
        describe: 'create ad-types',
    })
    async createAdTypes() {
        await this.adOptionsSeed.createAdTypes();
    }

    @Command({
        command: 'create:apartments-types',
        describe: 'create apartments-types',
    })
    async createApartmentsTypes() {
        await this.adOptionsSeed.createApartmentsTypes();
    }

    @Command({
        command: 'create:bathrooms',
        describe: 'create bathrooms',
    })
    async createBathrooms() {
        await this.adOptionsSeed.createBathrooms();
    }

    @Command({
        command: 'create:bedrooms',
        describe: 'create bedrooms',
    })
    async createBedrooms() {
        await this.adOptionsSeed.createBedrooms();
    }

    @Command({
        command: 'create:elevators',
        describe: 'create elevators',
    })
    async createElevators() {
        await this.adOptionsSeed.createElevators();
    }

    @Command({
        command: 'create:facilities',
        describe: 'create facilities',
    })
    async createFacilities() {
        await this.adOptionsSeed.createFacilities();
    }

    @Command({
        command: 'create:ad-options-init',
        describe: 'create ad-options-init',
    })
    async createAdOptions() {
        await Promise.all([
            this.adOptionsSeed.createAdTypes(),
            this.adOptionsSeed.createApartmentsTypes(),
            this.adOptionsSeed.createBathrooms(),
            this.adOptionsSeed.createBedrooms(),
            this.adOptionsSeed.createElevators(),
            this.adOptionsSeed.createFacilities(),
        ]);
    }

    @Command({
        command: 'create:ads-rent',
        describe: 'create ads-rent',
    })
    async createAdsRent() {
        await this.adsSeed.createAdsRent();
    }

    @Command({
        command: 'create:ads-buy',
        describe: 'create ads-buy',
    })
    async createAdsBuy() {
        await this.adsSeed.createAdsBuy();
    }

    @Command({
        command: 'create:ads',
        describe: 'create ads-rent and ads-buy',
    })
    async createAds() {
        await Promise.all([this.adsSeed.createAdsRent(), this.adsSeed.createAdsBuy()]);
    }

    @Command({
        command: 'create:users-init',
        describe: 'create users-init',
    })
    async createInitUsers() {
        await this.usersSeed.createInitUsers();
    }

    @Command({
        command: 'create:init',
        describe: 'create init',
    })
    async createInit() {
        await this.createAdOptions();
        await this.createAds();
        await this.createInitUsers();
    }
}
