import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdOptionsService } from '../ad-options/ad-options.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MediaService } from '../media/media.service';
import { PaginateResult } from '../types/pagination.types';
import { CreateAdBuyDto } from './dto/create-ad-buy.dto';
import { CreateAdRentDto } from './dto/create-ad-rent.dto';
import { CreateAdDto } from './dto/create-ad.dto';
import { GetAllQueryDto } from './dto/getall-query.dto';
import { AdBuy, AdBuyDocument } from './schemas/ads-buy.schema';
import { AdRent, AdRentDocument } from './schemas/ads-rent.schema';
import { Ad, AdDocument } from './schemas/ads.schema';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel(Ad.name) private adModel: Model<AdDocument>,
        @InjectModel(AdRent.name) private adRentModel: Model<AdRentDocument>,
        @InjectModel(AdBuy.name) private adBuyModel: Model<AdBuyDocument>,
        private cloudinary: CloudinaryService,
        private mediaService: MediaService,
        private adOptionsService: AdOptionsService
    ) {}

    async getAllAd(getAllQueryDto: GetAllQueryDto): Promise<PaginateResult<AdRent | AdBuy>> {
        const {
            page,
            limit,
            search,
            adType,
            apartmentsType,
            bedrooms,
            priceMin,
            priceMax,
            priceRentMin,
            priceRentMax,
            depositMin,
            depositMax,
        } = getAllQueryDto;

        const [adTypesIds, apartmentsTypeIds, bedroomsIds] = await Promise.all([
            this.adOptionsService.getAllAdTypeByValue(adType, 'id'),
            this.adOptionsService.getAllApartmentsByValue(apartmentsType, 'id'),
            this.adOptionsService.getAllBedroomsByValue(bedrooms, 'id'),
        ]);

        const skip = (page - 1) * limit;

        const filters: any = {
            $or: [
                { price: { $exists: true, $gte: priceMin, $lte: priceMax } },
                { priceRent: { $exists: true, $gte: priceRentMin, $lte: priceRentMax } },
                { deposit: { $exists: true, $gte: depositMin, $lte: depositMax } },
            ],
        };
        let projection: any = {};
        let sortOptions: any = { createdAt: -1 };

        if (!!search.length) {
            filters['$text'] = { $search: search, $caseSensitive: false };
            projection = { ...projection, score: { $meta: 'textScore' } };
            sortOptions = { ...sortOptions, score: { $meta: 'textScore' } };
        }
        if (!!adTypesIds.length) {
            filters.adType = { $in: adTypesIds };
        }
        if (!!apartmentsTypeIds.length) {
            filters.apartmentsType = { $in: apartmentsTypeIds };
        }
        if (!!bedroomsIds.length) {
            filters.bedrooms = { $in: bedroomsIds };
        }

        const records: (AdRent | AdBuy)[] = await this.adModel
            .find(filters, projection, { strictQuery: false })
            .select('-score')
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'elevator adType apartmentsType bedrooms bathrooms facilities',
                select: 'label value',
            })
            .lean();

        const totalRecords = await this.adModel
            .find(filters, null, { strictQuery: false })
            .countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        return {
            records,
            meta: {
                totalRecords,
                limit,
                totalPages,
                page,
            },
        };
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
        return (ad as CreateAdBuyDto).price !== undefined;
    }

    async createAdRent(
        createAdRentDto: CreateAdRentDto,
        files: Express.Multer.File[] = []
    ): Promise<AdRent> {
        // const images = await this.uploadImagesToCloudinary(files, 'ads');
        const media = await this.mediaService.saveAdsMedia(files);
        return this.adRentModel.create({ ...createAdRentDto, media });
    }

    async createAdBuy(
        createAdBuyDto: CreateAdBuyDto,
        files: Express.Multer.File[] = []
    ): Promise<AdBuy> {
        // const images = await this.uploadImagesToCloudinary(files, 'ads');
        const media = await this.mediaService.saveAdsMedia(files);
        return this.adBuyModel.create({ ...createAdBuyDto, media });
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

    async createAd(
        createAdDto: CreateAdRentDto | CreateAdBuyDto,
        files: Express.Multer.File[] = []
    ): Promise<AdRent | AdBuy> {
        const validatedParamsIds = await this.validateCreateAd(createAdDto);

        const dto: CreateAdRentDto | CreateAdBuyDto = {
            ...createAdDto,
            ...validatedParamsIds,
        };

        if (this.isCreateAdBuy(dto)) {
            return await this.createAdBuy(dto, files);
        }
        if (this.isCreateAdRent(dto)) {
            return await this.createAdRent(dto, files);
        }
    }

    async uploadImagesToCloudinary(files: Express.Multer.File[], folder: string) {
        const res = [];
        try {
            for (const imageItem of files) {
                const { asset_id, url } = await this.cloudinary.uploadImage(imageItem, folder);
                res.push({
                    id: asset_id,
                    image: url,
                });
            }
        } catch (err) {
            throw new BadRequestException('Invalid file type.');
        }

        return res;
    }
}
