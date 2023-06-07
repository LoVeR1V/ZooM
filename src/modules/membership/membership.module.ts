import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { UserModule } from '../users/users.module';
import { MembershipTypeEntity } from './entities/membership-type.entity';
import { MembershipStatusEntity } from './entities/membership-status.entity';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipEntity,MembershipTypeEntity,MembershipStatusEntity, UserRoleEntity]),
    UserModule
  ],
  providers: [MembershipService, RolesGuard],
  controllers: [MembershipController],
  exports: [MembershipService]
})
export class MembershipModule {}
