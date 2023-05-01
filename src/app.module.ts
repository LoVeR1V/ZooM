import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './modules/users/entities/user.entity';
import { UserRoleEntity } from './modules/users/entities/user-role.entity';
import { UserStatusEntity } from './modules/users/entities/user-status.entity';
import { TourEntity } from './modules/tours/entities/tour.entity';
import { TourTypeEntity } from './modules/tours/entities/tour-type.entity';
import { TicketEntity } from './modules/tickets/entities/ticket.entity';
import { TicketTypeEntity } from './modules/tickets/entities/ticket-type.entity';
import { TicketStatusEntity } from './modules/tickets/entities/ticket-status.entity';
import { AnimalEntity } from './modules/animals/entities/animals.entity';
import { StaffEntity } from './modules/staff/entities/staff.entity';
import { LicenseEntity } from './modules/staff/entities/license.entity';
import { SpecialityEntity } from './modules/staff/entities/speciality.entity';
import { HealthMonitoringEntity } from './modules/health_monitoring/entities/health-monitoring.entity';
import { HealthStatusEntity } from './modules/health_monitoring/entities/health-status.entity';

@Module({

  
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "mydb",
      "entities": [
        UserEntity,
        UserRoleEntity,
        UserStatusEntity,
        TourEntity,
        TourTypeEntity,
        TicketEntity,
        TicketTypeEntity,
        TicketStatusEntity,
        AnimalEntity,
        StaffEntity,
        LicenseEntity,
        SpecialityEntity,
        HealthMonitoringEntity,
        HealthStatusEntity
      ],
      "synchronize": false //If true, then all entities that are not here but are in MySQL will be deleted in MySQL
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})



export class AppModule {}
