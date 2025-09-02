import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Rating } from '../entities/rating.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async create(storeData: Partial<Store>): Promise<Store> {
    const store = this.storesRepository.create(storeData);
    return this.storesRepository.save(store);
  }

  async findAll(
    filters?: { 
      name?: string; 
      email?: string; 
      address?: string; 
      minRating?: number;
      maxRating?: number;
    },
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<{ stores: any[]; total: number }> {
    const where: any = {};
    
    if (filters?.name) where.name = ILike(`%${filters.name}%`);
    if (filters?.email) where.email = ILike(`%${filters.email}%`);
    if (filters?.address) where.address = ILike(`%${filters.address}%`);

    const [stores, total] = await this.storesRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['owner', 'ratings', 'ratings.user'],
    });

    // Calculate average ratings and return with store data
    const storesWithAvgRating = stores.map(store => {
      const ratings = store.ratings.map(r => r.rating);
      const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
      return { store, avgRating };
    });

    // Filter by rating if specified
    let filteredStores = storesWithAvgRating;
    if (filters?.minRating !== undefined || filters?.maxRating !== undefined) {
      filteredStores = storesWithAvgRating.filter(storeWithRating => {
        if (filters.minRating !== undefined && storeWithRating.avgRating < filters.minRating) return false;
        if (filters.maxRating !== undefined && storeWithRating.avgRating > filters.maxRating) return false;
        return true;
      });
    }

    return { stores: filteredStores, total: filteredStores.length };
  }

  async findById(id: number): Promise<{ store: Store; avgRating: number }> {
    const store = await this.storesRepository.findOne({ 
      where: { id },
      relations: ['owner', 'ratings', 'ratings.user'],
    });
    
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    // Calculate average rating
    const ratings = store.ratings.map(r => r.rating);
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
    
    return { store, avgRating };
  }

  async update(id: number, storeData: Partial<Store>): Promise<Store> {
    await this.storesRepository.update(id, storeData);
    const result = await this.findById(id);
    return result.store;
  }

  async remove(id: number): Promise<void> {
    await this.storesRepository.delete(id);
  }

  async getStats() {
    const totalStores = await this.storesRepository.count();
    const totalRatings = await this.ratingsRepository.count();
    
    return {
      totalStores,
      totalRatings,
    };
  }

  async getStoreRatings(storeId: number) {
    const ratings = await this.ratingsRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
    });
    
    return ratings;
  }
}
