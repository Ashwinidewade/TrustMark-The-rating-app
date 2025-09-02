import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(ratingData: Partial<Rating>): Promise<Rating> {
    // Check if store exists
    const store = await this.storesRepository.findOne({ where: { id: ratingData.store.id } });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id: ratingData.user.id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if rating already exists for this user and store
    const existingRating = await this.ratingsRepository.findOne({
      where: {
        store: { id: ratingData.store.id },
        user: { id: ratingData.user.id },
      },
    });

    if (existingRating) {
      // Update existing rating
      return this.ratingsRepository.save({
        ...existingRating,
        rating: ratingData.rating,
        comment: ratingData.comment,
      });
    }

    // Create new rating
    const rating = this.ratingsRepository.create(ratingData);
    return this.ratingsRepository.save(rating);
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingsRepository.find({
      relations: ['store', 'user'],
    });
  }

  async findById(id: number): Promise<Rating> {
    const rating = await this.ratingsRepository.findOne({ 
      where: { id },
      relations: ['store', 'user'],
    });
    
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    
    return rating;
  }

  async findByStore(storeId: number): Promise<Rating[]> {
    return this.ratingsRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
    });
  }

  async findByUser(userId: number): Promise<Rating[]> {
    return this.ratingsRepository.find({
      where: { user: { id: userId } },
      relations: ['store'],
    });
  }

  async update(id: number, ratingData: Partial<Rating>): Promise<Rating> {
    await this.ratingsRepository.update(id, ratingData);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.ratingsRepository.delete(id);
  }

  async getUserRatingForStore(userId: number, storeId: number): Promise<Rating | null> {
    return this.ratingsRepository.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
      relations: ['store'],
    });
  }
}
