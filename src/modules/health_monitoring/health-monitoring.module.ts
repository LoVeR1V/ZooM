import { Module } from '@nestjs/common';
import { HealthMonitoringService } from './health-monitoring.service';
import { HealthMonitoringController } from './health-monitoring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { StaffModule } from '../staff/staff.module';
import { StaffEntity } from '../staff/entities/staff.entity';
import { HealthStatusEntity } from './entities/health-status.entity';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { UserModule } from '../users/users.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({

    imports: [
    TypeOrmModule.forFeature([HealthMonitoringEntity,StaffEntity,HealthStatusEntity, UserRoleEntity]),
    StaffModule, UserModule
  ],

  providers: [HealthMonitoringService,RolesGuard],
  controllers: [HealthMonitoringController],
  exports: [HealthMonitoringService]
})
export class HealthMonitoringModule {}
