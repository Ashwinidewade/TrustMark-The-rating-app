import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  ValidationPipe,
  ParseIntPipe 
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store } from '../entities/store.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
    @Query('minRating') minRating?: number,
    @Query('maxRating') maxRating?: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC'
  ) {
    return this.storesService.findAll(
      { name, email, address, minRating, maxRating },
      page,
      limit,
      sortBy,
      sortOrder
    );
  }

  @Get('stats')
  @Roles(UserRole.ADMIN)
  async getStats() {
    return this.storesService.getStats();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.findById(id);
  }

  @Get(':id/ratings')
  async getStoreRatings(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.getStoreRatings(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body(ValidationPipe) createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateStoreDto: UpdateStoreDto
  ) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.remove(id);
  }
}
