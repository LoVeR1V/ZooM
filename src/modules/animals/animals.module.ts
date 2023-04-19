import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './entities/animals.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([AnimalEntity]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService]
})
export class AnimalsModule {}
