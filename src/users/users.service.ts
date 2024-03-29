import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Role } from '../auth/types/role.enum';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().lean();
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).lean();

        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).lean();

        return user;
    }

    async createUser(userDto: CreateUserDto): Promise<User> {
        const { email, password } = userDto;
        const candidate = await this.getUserByEmail(email);

        if (candidate) {
            throw new ConflictException('User with this email already exists');
        }

        const roles = [Role.User];
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ ...userDto, roles, password: hashedPassword });

        return user;
    }

    async addRole(addRoleDto: AddRoleDto): Promise<User> {
        const { value, userId } = addRoleDto;
        const user = await this.getUserById(userId);
        const role = Object.values(Role).find((item) => item === value);

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const roles = [role];

        const updatedUser = await this.userModel
            .findByIdAndUpdate(user._id, { $addToSet: { roles } }, { new: true })
            .lean();

        return updatedUser;
    }
}
