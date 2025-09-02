import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Rating } from '../entities/rating.entity';
export declare class StoresService {
    private storesRepository;
    private ratingsRepository;
    constructor(storesRepository: Repository<Store>, ratingsRepository: Repository<Rating>);
    create(storeData: Partial<Store>): Promise<Store>;
    findAll(filters?: {
        name?: string;
        email?: string;
        address?: string;
        minRating?: number;
        maxRating?: number;
    }, page?: number, limit?: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
        stores: Store[];
        total: number;
    }>;
    findById(id: number): Promise<Store>;
    update(id: number, storeData: Partial<Store>): Promise<Store>;
    remove(id: number): Promise<void>;
    getStats(): Promise<{
        totalStores: number;
        totalRatings: number;
    }>;
    getStoreRatings(storeId: number): Promise<Rating[]>;
}
