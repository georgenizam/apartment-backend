import { Injectable } from '@nestjs/common';
import { AdType, AdTypeDocument } from './schemas/ad-type.schema';
import { CreateAdTypeDto } from './dto/create-ad-type.dto';
import { ApartmentsType, ApartmentsTypeDocument } from './schemas/apartments-type.schema';
import { CreateApartmentsTypeDto } from './dto/create-apartments-type.dto';
import { Bedrooms, BedroomsDocument } from './schemas/bedrooms.schema';
import { CreateBedroomsDto } from './dto/create-bedrooms.dto';
import { Bathrooms, BathroomsDocument } from './schemas/bathrooms.schema';
import { CreateBathroomsDto } from './dto/create-bathrooms.dto';
import { Facilities, FacilitiesDocument } from './schemas/facilities.schema';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { Elevator, ElevatorDocument } from './schemas/elevator.schema';
import { CreateElevatorDto } from './dto/create-elevator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdOptionsService {
    constructor(
        @InjectModel(AdType.name) private adTypeModel: Model<AdTypeDocument>,
        @InjectModel(ApartmentsType.name)
        private apartmentsTypeModel: Model<ApartmentsTypeDocument>,
        @InjectModel(Bedrooms.name) private bedroomsModel: Model<BedroomsDocument>,
        @InjectModel(Bathrooms.name) private bathroomsModel: Model<BathroomsDocument>,
        @InjectModel(Elevator.name) private elevatorModel: Model<ElevatorDocument>,
        @InjectModel(Facilities.name) private facilitiesModel: Model<FacilitiesDocument>
    ) {}
    async getAllAdType(): Promise<AdType[]> {
        return this.adTypeModel.find().lean();
    }
    async getAdTypeByValue(value: string): Promise<AdType> {
        return this.adTypeModel.findOne({ value }).lean();
    }
    async createAdType(createAdTypeDto: CreateAdTypeDto): Promise<AdType> {
        return this.adTypeModel.create(createAdTypeDto);
    }

    async getAllApartmentsType(): Promise<ApartmentsType[]> {
        return this.apartmentsTypeModel.find().lean();
    }
    async getApartmentsTypeByValue(value: string): Promise<ApartmentsType> {
        return this.apartmentsTypeModel.findOne({ value }).lean();
    }
    async createApartmentsType(
        createApartmentsTypeDto: CreateApartmentsTypeDto
    ): Promise<ApartmentsType> {
        return this.apartmentsTypeModel.create(createApartmentsTypeDto);
    }

    async getAllBedrooms(): Promise<Bedrooms[]> {
        return this.bedroomsModel.find().lean();
    }
    async getBedroomsByValue(value: string): Promise<Bedrooms> {
        return this.bedroomsModel.findOne({ value }).lean();
    }
    async createBedrooms(createBedroomsDto: CreateBedroomsDto): Promise<Bedrooms> {
        return this.bedroomsModel.create(createBedroomsDto);
    }

    async getAllBathrooms(): Promise<Bathrooms[]> {
        return this.bathroomsModel.find().lean();
    }
    async getBathroomsByValue(value: string): Promise<Bathrooms> {
        return this.bathroomsModel.findOne({ value }).lean();
    }
    async createBathrooms(createBathroomsDto: CreateBathroomsDto): Promise<Bathrooms> {
        return this.bathroomsModel.create(createBathroomsDto);
    }

    async getAllFacilities(): Promise<Facilities[]> {
        return this.facilitiesModel.find().lean();
    }
    async getAllFacilitiesByValue(values: string[]): Promise<Facilities[]> {
        return this.facilitiesModel.find().where('value').all(values).lean();
    }
    async getFacilitiesByValue(value: string): Promise<Facilities> {
        return this.facilitiesModel.findOne({ value }).lean();
    }
    async createFacilities(createFacilitiesDto: CreateFacilitiesDto): Promise<Facilities> {
        return this.facilitiesModel.create(createFacilitiesDto);
    }

    async getAllElevator(): Promise<Elevator[]> {
        return this.elevatorModel.find().lean();
    }
    async getElevatorByValue(value: string): Promise<Elevator> {
        return this.elevatorModel.findOne({ value }).lean();
    }
    async createElevator(createElevatorDto: CreateElevatorDto): Promise<Elevator> {
        return this.elevatorModel.create(createElevatorDto);
    }
}
