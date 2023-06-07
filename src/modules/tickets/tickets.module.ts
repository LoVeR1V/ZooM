import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { UserModule } from '../users/users.module';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity,UserEntity,UserRoleEntity]),
    UserModule,
  ],

  controllers: [TicketsController],
  providers: [TicketsService, UsersService, RolesGuard],
  exports: [TicketsService]
})
export class TicketsModule {}
