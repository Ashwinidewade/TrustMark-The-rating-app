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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(userData) {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }
    async findAll(filters, page = 1, limit = 10, sortBy = 'name', sortOrder = 'ASC') {
        const where = {};
        if (filters === null || filters === void 0 ? void 0 : filters.name)
            where.name = (0, typeorm_2.ILike)(`%${filters.name}%`);
        if (filters === null || filters === void 0 ? void 0 : filters.email)
            where.email = (0, typeorm_2.ILike)(`%${filters.email}%`);
        if (filters === null || filters === void 0 ? void 0 : filters.address)
            where.address = (0, typeorm_2.ILike)(`%${filters.address}%`);
        if (filters === null || filters === void 0 ? void 0 : filters.role)
            where.role = filters.role;
        const [users, total] = await this.usersRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['stores', 'ratings'],
        });
        return { users, total };
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['stores', 'ratings'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['stores', 'ratings'],
        });
    }
    async update(id, userData) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        await this.usersRepository.update(id, userData);
        return this.findById(id);
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async getStats() {
        const totalUsers = await this.usersRepository.count();
        const totalAdmins = await this.usersRepository.count({ where: { role: user_entity_1.UserRole.ADMIN } });
        const totalStoreOwners = await this.usersRepository.count({ where: { role: user_entity_1.UserRole.STORE_OWNER } });
        const totalNormalUsers = await this.usersRepository.count({ where: { role: user_entity_1.UserRole.USER } });
        return {
            totalUsers,
            totalAdmins,
            totalStoreOwners,
            totalNormalUsers,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map