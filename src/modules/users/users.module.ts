import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { TicketEntity } from '../tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,TicketEntity]),
    
    
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UserModule {}
