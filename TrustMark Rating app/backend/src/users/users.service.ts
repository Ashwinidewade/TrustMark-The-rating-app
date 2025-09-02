import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findAll(
    filters?: { 
      name?: string; 
      email?: string; 
      address?: string; 
      role?: UserRole 
    },
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<{ users: User[]; total: number }> {
    const where: any = {};
    
    if (filters?.name) where.name = ILike(`%${filters.name}%`);
    if (filters?.email) where.email = ILike(`%${filters.email}%`);
    if (filters?.address) where.address = ILike(`%${filters.address}%`);
    if (filters?.role) where.role = filters.role;

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['stores', 'ratings'],
    });

    return { users, total };
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['stores', 'ratings'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { email },
      relations: ['stores', 'ratings'],
    });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getStats() {
    const totalUsers = await this.usersRepository.count();
    const totalAdmins = await this.usersRepository.count({ where: { role: UserRole.ADMIN } });
    const totalStoreOwners = await this.usersRepository.count({ where: { role: UserRole.STORE_OWNER } });
    const totalNormalUsers = await this.usersRepository.count({ where: { role: UserRole.USER } });

    return {
      totalUsers,
      totalAdmins,
      totalStoreOwners,
      totalNormalUsers,
    };
  }
}
