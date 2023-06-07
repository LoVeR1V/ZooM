import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { TourTypeEntity } from './entities/tour-type.entity';
import { UserRoleService } from '../users/user-role.service';
import { UserModule } from '../users/users.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { UsersService } from '../users/users.service';
import { ZoneEntity } from '../animals/entities/zone.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([TourEntity,UserRoleEntity, UserRoleEntity]), UserModule
  ], 

  controllers: [ToursController],
  providers: [ToursService,  RolesGuard],
  exports: [ToursService]
})
export class ToursModule {}
