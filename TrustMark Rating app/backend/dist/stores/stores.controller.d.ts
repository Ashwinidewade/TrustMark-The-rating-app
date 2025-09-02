import { StoresService } from './stores.service';
import { Store } from '../entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoresController {
    private storesService;
    constructor(storesService: StoresService);
    findAll(name?: string, email?: string, address?: string, minRating?: number, maxRating?: number, page?: number, limit?: number, sortBy?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
        stores: Store[];
        total: number;
    }>;
    getStats(): Promise<{
        totalStores: number;
        totalRatings: number;
    }>;
    findOne(id: number): Promise<Store>;
    getStoreRatings(id: number): Promise<import("../entities/rating.entity").Rating[]>;
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<void>;
}
