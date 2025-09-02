import { RatingsService } from './ratings.service';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    findAll(): Promise<Rating[]>;
    findByStore(storeId: number): Promise<Rating[]>;
    findByUser(userId: number): Promise<Rating[]>;
    getUserRatingForStore(req: any, storeId: number): Promise<Rating>;
    findOne(id: number): Promise<Rating>;
    create(req: any, createRatingDto: CreateRatingDto): Promise<Rating>;
    update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating>;
    remove(id: number): Promise<void>;
}
