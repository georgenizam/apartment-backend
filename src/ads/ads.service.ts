import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ad, AdDocument } from './schemas/ads.schema';
import { Model } from 'mongoose';
import { CreateAdDto } from './dto/create-ad.dto';
import { AdOptionsService } from '../ad-options/ad-options.service';
import { AdRent, AdRentDocument } from './schemas/ads-rent.schema';
import { CreateAdBuyDto } from './dto/create-ad-buy.dto';
import { CreateAdRentDto } from './dto/create-ad-rent.dto';
import { AdBuy, AdBuyDocument } from './schemas/ads-buy.schema';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel(Ad.name) private adModel: Model<AdDocument>,
        @InjectModel(AdRent.name) private adRentModel: Model<AdRentDocument>,
        @InjectModel(AdBuy.name) private adBuyModel: Model<AdBuyDocument>,
        private adOptionsService: AdOptionsService
    ) {}

    async getAllAd(): Promise<(AdBuy | AdRent)[]> {
        return this.adModel
            .find()
            .populate({
                path: 'elevator adType apartmentsType bedrooms bathrooms facilities',
                select: 'label value',
            })
            .lean();
    }
    async getAdById(id: string): Promise<AdBuy | AdRent> {
        return this.adModel
            .findById(id)
            .populate({
                path: 'elevator adType apartmentsType bedrooms bathrooms facilities',
                select: 'label value',
            })
            .lean();
    }
    isCreateAdRent(ad: CreateAdRentDto | CreateAdBuyDto): ad is CreateAdRentDto {
        return (ad as CreateAdRentDto).priceRent !== undefined;
    }
    isCreateAdBuy(ad: CreateAdRentDto | CreateAdBuyDto): ad is CreateAdBuyDto {
        return (ad as CreateAdRentDto).price !== undefined;
    }
    async createAdRent(createAdRentDto: CreateAdRentDto): Promise<AdRent> {
        return this.adRentModel.create(createAdRentDto);
    }
    async createAdBuy(createAdBuyDto: CreateAdBuyDto): Promise<AdBuy> {
        return this.adBuyModel.create(createAdBuyDto);
    }
    async validateCreateAd(createAdDto: CreateAdDto) {
        const [elevator, adType, apartmentsType, bedrooms, bathrooms, facilities] =
            await Promise.all([
                this.adOptionsService.getElevatorByValue(createAdDto.elevator),
                this.adOptionsService.getAdTypeByValue(createAdDto.adType),
                this.adOptionsService.getApartmentsTypeByValue(createAdDto.apartmentsType),
                this.adOptionsService.getBedroomsByValue(createAdDto.bedrooms),
                this.adOptionsService.getBathroomsByValue(createAdDto.bathrooms),
                this.adOptionsService.getAllFacilitiesByValue([...createAdDto.facilities]),
            ]);

        if (!elevator) {
            throw new NotFoundException('Not found elevator value');
        }
        if (!adType) {
            throw new NotFoundException('Not found adType value');
        }
        if (!apartmentsType) {
            throw new NotFoundException('Not found apartmentsType value');
        }
        if (!bedrooms) {
            throw new NotFoundException('Not found bedrooms value');
        }
        if (!bathrooms) {
            throw new NotFoundException('Not found bathrooms value');
        }
        if (!facilities) {
            throw new NotFoundException('Not found facilities value');
        }

        return {
            elevator: elevator._id.toString(),
            adType: adType._id.toString(),
            apartmentsType: apartmentsType._id.toString(),
            bedrooms: bedrooms._id.toString(),
            bathrooms: bathrooms._id.toString(),
            facilities: facilities.map((item) => item._id.toString()),
        };
    }
    async createAd(createAdDto: CreateAdDto, images: string[]): Promise<AdRent | AdBuy> {
        const { elevator, adType, apartmentsType, bedrooms, bathrooms, facilities } =
            await this.validateCreateAd(createAdDto);

        const dto: CreateAdDto = {
            ...createAdDto,
            elevator,
            adType,
            apartmentsType,
            bedrooms,
            bathrooms,
            facilities,
        };

        if (this.isCreateAdBuy(dto)) {
            return await this.createAdBuy(dto);
        }

        if (this.isCreateAdRent(dto)) {
            return await this.createAdRent(dto);
        }
    }
}
