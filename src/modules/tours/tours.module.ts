import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([TourEntity]),
  ],

  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService]
})
export class ToursModule {}
