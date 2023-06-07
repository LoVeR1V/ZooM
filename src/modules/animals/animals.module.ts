import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './entities/animals.entity';
import { ZoneEntity } from './entities/zone.entity';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { UserModule } from '../users/users.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      AnimalEntity,ZoneEntity,UserRoleEntity]),UserModule
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService,RolesGuard]
})
export class AnimalsModule {}
