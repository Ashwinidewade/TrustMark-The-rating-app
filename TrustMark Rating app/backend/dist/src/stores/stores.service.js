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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("../entities/store.entity");
const rating_entity_1 = require("../entities/rating.entity");
let StoresService = class StoresService {
    constructor(storesRepository, ratingsRepository) {
        this.storesRepository = storesRepository;
        this.ratingsRepository = ratingsRepository;
    }
    async create(storeData) {
        const store = this.storesRepository.create(storeData);
        return this.storesRepository.save(store);
    }
    async findAll(filters, page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC') {
        const where = {};
        if (filters === null || filters === void 0 ? void 0 : filters.name)
            where.name = (0, typeorm_2.ILike)(`%${filters.name}%`);
        if (filters === null || filters === void 0 ? void 0 : filters.email)
            where.email = (0, typeorm_2.ILike)(`%${filters.email}%`);
        if (filters === null || filters === void 0 ? void 0 : filters.address)
            where.address = (0, typeorm_2.ILike)(`%${filters.address}%`);
        const [stores, total] = await this.storesRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['owner', 'ratings', 'ratings.user'],
        });
        const storesWithAvgRating = stores.map(store => {
            const ratings = store.ratings.map(r => r.rating);
            const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
            return { store, avgRating };
        });
        let filteredStores = storesWithAvgRating;
        if ((filters === null || filters === void 0 ? void 0 : filters.minRating) !== undefined || (filters === null || filters === void 0 ? void 0 : filters.maxRating) !== undefined) {
            filteredStores = storesWithAvgRating.filter(storeWithRating => {
                if (filters.minRating !== undefined && storeWithRating.avgRating < filters.minRating)
                    return false;
                if (filters.maxRating !== undefined && storeWithRating.avgRating > filters.maxRating)
                    return false;
                return true;
            });
        }
        return { stores: filteredStores, total: filteredStores.length };
    }
    async findById(id) {
        const store = await this.storesRepository.findOne({
            where: { id },
            relations: ['owner', 'ratings', 'ratings.user'],
        });
        if (!store) {
            throw new common_1.NotFoundException('Store not found');
        }
        const ratings = store.ratings.map(r => r.rating);
        const avgRating = ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
        return { store, avgRating };
    }
    async update(id, storeData) {
        await this.storesRepository.update(id, storeData);
        const result = await this.findById(id);
        return result.store;
    }
    async remove(id) {
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
    async getStoreRatings(storeId) {
        const ratings = await this.ratingsRepository.find({
            where: { store: { id: storeId } },
            relations: ['user'],
        });
        return ratings;
    }
};
StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoresService);
exports.StoresService = StoresService;
//# sourceMappingURL=stores.service.js.map