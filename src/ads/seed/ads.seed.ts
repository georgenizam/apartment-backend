import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import appRootPath from 'app-root-path';
import { createReadStream } from 'fs';
import * as fs from 'fs/promises';
import * as _ from 'lodash';
import * as path from 'path';
import { bathrooms, bedrooms, elevators, facilities } from '../../ad-options/seed/data';
import {
    DEFAULT_ADS_FOLDER,
    DEFAULT_FOLDER,
    ROOT_UPLOAD_FOLDER,
} from '../../media/constants/media.constants';
import { AdsService } from '../ads.service';

@Injectable()
export class AdsSeed {
    constructor(private readonly adsService: AdsService) {}

    async createAdsRent(itemsCount = 1) {
        const adsRent = [];

        const files: Express.Multer.File[] = await this.createAdsMedia(_.random(5, 10));

        for (let i = 0; i < itemsCount; i++) {
            adsRent.push({
                adType: 'rent',
                apartmentsType: 'apartment',
                title: faker.lorem.sentence(7),
                desc: faker.lorem.paragraph(30),
                floor: _.random(1, 30),
                floorsBuilding: 30,
                yearBuilding: faker.date.soon(),
                square: _.random(30, 150),
                elevator: _.sample(elevators).value,
                bedrooms: _.sample(bedrooms).value,
                facilities: _.sampleSize(facilities, _.random(1, facilities.length)).map(
                    ({ value }) => value
                ),
                bathrooms: _.sample(bathrooms).value,
                country: faker.address.country(),
                city: faker.address.city(),
                street: faker.address.street(),
                address: faker.address.buildingNumber(),
                priceRent: _.random(100, 100000),
                deposit: _.random(100, 3000),
            });
        }

        await Promise.all(
            adsRent.map((adsRentItemDto) => this.adsService.createAd(adsRentItemDto, files))
        );
    }

    async createAdsBuy(itemsCount = 1) {
        const adsBuy = [];

        const files: Express.Multer.File[] = await this.createAdsMedia(_.random(1, 10));

        for (let i = 0; i < itemsCount; i++) {
            adsBuy.push({
                adType: 'buy',
                apartmentsType: 'apartment',
                title: faker.lorem.sentence(7),
                desc: faker.lorem.paragraph(30),
                floor: _.random(1, 30),
                floorsBuilding: 30,
                yearBuilding: faker.date.soon(),
                square: _.random(30, 150),
                elevator: _.sample(elevators).value,
                bedrooms: _.sample(bedrooms).value,
                facilities: _.sampleSize(facilities, _.random(1, facilities.length)).map(
                    ({ value }) => value
                ),
                bathrooms: _.sample(bathrooms).value,
                country: faker.address.country(),
                city: faker.address.city(),
                street: faker.address.street(),
                address: faker.address.buildingNumber(),
                price: _.random(10000, 10000000),
            });
        }

        await Promise.all(
            adsBuy.map((adsRentItemDto) => this.adsService.createAd(adsRentItemDto, files))
        );
    }

    private async createAdsMedia(itemsCount = 5): Promise<Express.Multer.File[]> {
        const files: Express.Multer.File[] = [];

        for (let i = 0; i < itemsCount; i++) {
            const imageName = `thumb-${i + 1}.jpg`;
            const imagePath = path.join(
                appRootPath.path,
                ROOT_UPLOAD_FOLDER,
                DEFAULT_FOLDER,
                DEFAULT_ADS_FOLDER,
                imageName
            );

            const imageBuffer = await fs.readFile(imagePath);

            files.push({
                fieldname: 'files',
                originalname: imageName,
                encoding: '7bit',
                mimetype: 'image/jpeg',
                buffer: imageBuffer,
                size: Buffer.byteLength(imageBuffer),
                destination: 'destination-path',
                filename: 'file-name',
                path: 'file-path',
                stream: createReadStream(imagePath),
            });
        }

        return files;
    }
}
