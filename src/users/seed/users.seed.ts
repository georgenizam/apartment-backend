import { Injectable } from '@nestjs/common';
import { Role } from '../../auth/types/role.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { userAdmin, userDefault } from './data';

@Injectable()
export class UsersSeed {
    constructor(private readonly usersService: UsersService) {}

    async createInitUsers() {
        const users: CreateUserDto[] = [userAdmin, userDefault];
        const [admin] = await Promise.all(
            users.map((usersItemDto) => this.usersService.createUser(usersItemDto))
        );

        await this.usersService.addRole({ value: Role.Admin, userId: admin._id.toString() });
    }
}
