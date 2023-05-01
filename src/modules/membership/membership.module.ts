import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipEntity]),
  ],
  providers: [MembershipService],
  controllers: [MembershipController],
  exports: [MembershipService]
})
export class MembershipModule {}
