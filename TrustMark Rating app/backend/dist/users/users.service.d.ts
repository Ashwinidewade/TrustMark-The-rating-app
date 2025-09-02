import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findAll(filters?: {
        name?: string;
        email?: string;
        address?: string;
        role?: UserRole;
    }, page?: number, limit?: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
        users: User[];
        total: number;
    }>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, userData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    getStats(): Promise<{
        totalUsers: number;
        totalAdmins: number;
        totalStoreOwners: number;
        totalNormalUsers: number;
    }>;
}
