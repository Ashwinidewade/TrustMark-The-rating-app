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
  ParseIntPipe,
  Req 
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from '../entities/rating.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.ratingsService.findAll();
  }

  @Get('store/:storeId')
  async findByStore(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.ratingsService.findByStore(storeId);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.ratingsService.findByUser(userId);
  }

  @Get('user-rating/:storeId')
  async getUserRatingForStore(
    @Req() req: any,
    @Param('storeId', ParseIntPipe) storeId: number
  ) {
    const userId = req.user.id;
    return this.ratingsService.getUserRatingForStore(userId, storeId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findById(id);
  }

  @Post()
  async create(
    @Req() req: any,
    @Body(ValidationPipe) createRatingDto: CreateRatingDto
  ) {
    const userId = req.user.id;
    return this.ratingsService.create({
      ...createRatingDto,
      user: { id: userId } as any,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateRatingDto: UpdateRatingDto
  ) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.remove(id);
  }
}
