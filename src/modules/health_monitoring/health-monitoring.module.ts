import { Module } from '@nestjs/common';
import { HealthMonitoringService } from './health-monitoring.service';
import { HealthMonitoringController } from './health-monitoring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { StaffModule } from '../staff/staff.module';

@Module({

    imports: [
    TypeOrmModule.forFeature([HealthMonitoringEntity]),
    StaffModule
  ],

  providers: [HealthMonitoringService],
  controllers: [HealthMonitoringController],
  exports: [HealthMonitoringService]
})
export class HealthMonitoringModule {}
