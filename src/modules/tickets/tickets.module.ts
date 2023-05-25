import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { UserModule } from '../users/users.module';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity,UserEntity]),
    UserModule,
  ],

  controllers: [TicketsController],
  providers: [TicketsService, UsersService],
  exports: [TicketsService]
})
export class TicketsModule {}
