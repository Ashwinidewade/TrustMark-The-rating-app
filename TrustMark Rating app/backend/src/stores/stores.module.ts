import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from '../entities/store.entity';
import { User } from '../entities/user.entity';
import { Rating } from '../entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User, Rating])],
  providers: [StoresService],
  controllers: [StoresController],
  exports: [StoresService],
})
export class StoresModule {}

