import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipDTO } from './DTO/membership.dto';
import { MembershipEntity } from './entities/membership.entity';

@Controller('membership')
export class MembershipController {
	constructor(private readonly membershipService: MembershipService){}

	@Post('create-membership')  //not working
	async createMembership(@Body() createMembershipDTO: MembershipDTO ): Promise<MembershipEntity>{
		const membershipEntity = new MembershipEntity();
    Object.assign(membershipEntity, createMembershipDTO);
		return await this.membershipService.createMembership(membershipEntity);	
	}

	@Get(':id')
  async getMembershipById(@Param('id') id: number): Promise<MembershipEntity> {
    return await this.membershipService.getMembershipById(id);
  }

	@Get('get-all-memberhips')
  async getAllMemberships(): Promise<MembershipEntity[]> {
    return await this.membershipService.getAllMemberships();
  }
//not working
	@Put(':id')
  async updateMembershipById(@Param('id') id: number, @Body() updateMembershipDTO: MembershipDTO): Promise<MembershipEntity> {
    const updatedMembership = new MembershipEntity();
    Object.assign(updatedMembership, updateMembershipDTO);
    return await this.membershipService.updateMembershipById(id, updatedMembership);
  }

	@Delete(':id')
  async deleteMembershipById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.membershipService.deleteMembershipById(id);
  }
	
}
