import { UsersService } from './users.service';
import { User, UserRole } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(name?: string, email?: string, address?: string, role?: UserRole, page?: number, limit?: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
        users: User[];
        total: number;
    }>;
    getStats(): Promise<{
        totalUsers: number;
        totalAdmins: number;
        totalStoreOwners: number;
        totalNormalUsers: number;
    }>;
    findOne(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
