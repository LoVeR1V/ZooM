import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entities/staff.entity';
import { LicenseEntity } from './entities/license.entity';
import { SpecialityEntity } from './entities/speciality.entity';
import { UserModule } from '../users/users.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleEntity } from '../users/entities/user-role.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([StaffEntity, LicenseEntity, SpecialityEntity, UserRoleEntity]), UserModule
  ],

  controllers: [StaffController],
  providers: [StaffService,RolesGuard],
  exports: [StaffService]
})
export class StaffModule {}
