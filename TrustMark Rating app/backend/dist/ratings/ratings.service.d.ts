import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';
export declare class RatingsService {
    private ratingsRepository;
    private storesRepository;
    private usersRepository;
    constructor(ratingsRepository: Repository<Rating>, storesRepository: Repository<Store>, usersRepository: Repository<User>);
    create(ratingData: Partial<Rating>): Promise<Rating>;
    findAll(): Promise<Rating[]>;
    findById(id: number): Promise<Rating>;
    findByStore(storeId: number): Promise<Rating[]>;
    findByUser(userId: number): Promise<Rating[]>;
    update(id: number, ratingData: Partial<Rating>): Promise<Rating>;
    remove(id: number): Promise<void>;
    getUserRatingForStore(userId: number, storeId: number): Promise<Rating | null>;
}
