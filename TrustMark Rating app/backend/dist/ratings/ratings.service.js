"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rating_entity_1 = require("../entities/rating.entity");
const store_entity_1 = require("../entities/store.entity");
const user_entity_1 = require("../entities/user.entity");
let RatingsService = class RatingsService {
    constructor(ratingsRepository, storesRepository, usersRepository) {
        this.ratingsRepository = ratingsRepository;
        this.storesRepository = storesRepository;
        this.usersRepository = usersRepository;
    }
    async create(ratingData) {
        const store = await this.storesRepository.findOne({ where: { id: ratingData.store.id } });
        if (!store) {
            throw new common_1.NotFoundException('Store not found');
        }
        const user = await this.usersRepository.findOne({ where: { id: ratingData.user.id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingRating = await this.ratingsRepository.findOne({
            where: {
                store: { id: ratingData.store.id },
                user: { id: ratingData.user.id },
            },
        });
        if (existingRating) {
            return this.ratingsRepository.save(Object.assign(Object.assign({}, existingRating), { rating: ratingData.rating, comment: ratingData.comment }));
        }
        const rating = this.ratingsRepository.create(ratingData);
        return this.ratingsRepository.save(rating);
    }
    async findAll() {
        return this.ratingsRepository.find({
            relations: ['store', 'user'],
        });
    }
    async findById(id) {
        const rating = await this.ratingsRepository.findOne({
            where: { id },
            relations: ['store', 'user'],
        });
        if (!rating) {
            throw new common_1.NotFoundException('Rating not found');
        }
        return rating;
    }
    async findByStore(storeId) {
        return this.ratingsRepository.find({
            where: { store: { id: storeId } },
            relations: ['user'],
        });
    }
    async findByUser(userId) {
        return this.ratingsRepository.find({
            where: { user: { id: userId } },
            relations: ['store'],
        });
    }
    async update(id, ratingData) {
        await this.ratingsRepository.update(id, ratingData);
        return this.findById(id);
    }
    async remove(id) {
        await this.ratingsRepository.delete(id);
    }
    async getUserRatingForStore(userId, storeId) {
        return this.ratingsRepository.findOne({
            where: {
                user: { id: userId },
                store: { id: storeId },
            },
            relations: ['store'],
        });
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __param(1, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map