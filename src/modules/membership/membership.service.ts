import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class MembershipService {
	constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createMembership(membership: MembershipEntity): Promise<MembershipEntity> {
     return await this.membershipRepository.save(membership);
    }

  
  async getMembershipById(id: number): Promise<MembershipEntity> {
      return await this.membershipRepository.findOne({
        where: {id_membership:id},
      })
    }

   async getAllMemberships(): Promise<MembershipEntity[]> {
    return await this.membershipRepository.find();
  }

  async updateMembershipById(id: number, updatedMembership: MembershipEntity): Promise<MembershipEntity> {
  const membership = await this.membershipRepository.findOne({
        where: {id_membership:id},
      })

  if (!membership) {
    throw new NotFoundException(`health with ID ${id} not found`);
  }
  Object.assign(membership, updatedMembership);
  return await this.membershipRepository.save(membership);
}

  async deleteMembershipById(id: number, user?: any): Promise<void> {
  
    const result = await this.membershipRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Membership with id ${id} not found`);
    }
  }

  async createMem(mem: MembershipEntity, user_id: number): Promise<MembershipEntity> {
    const res_user = await this.usersService.getUserById(user_id);
  
    if (!res_user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
  
    mem.user = res_user;
  
    return await this.membershipRepository.save(mem);
  }

}
