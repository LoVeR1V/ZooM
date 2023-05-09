import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembershipService {
	constructor(
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
  ) {}
//not working
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
//not working
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

}
