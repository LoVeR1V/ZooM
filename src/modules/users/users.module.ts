import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoleService } from './user-role.service';
import { UserRoleEntity } from './entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,TicketEntity,UserRoleEntity]),
    
    
  ],
  providers: [UsersService,UserRoleService, RolesGuard],
  controllers: [UsersController],
  exports: [UsersService, UserRoleService]
})
export class UserModule {}
