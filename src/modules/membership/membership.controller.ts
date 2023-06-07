import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipDTO } from './DTO/membership.dto';
import { MembershipEntity } from './entities/membership.entity';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('membership')
export class MembershipController {
	constructor(private readonly membershipService: MembershipService){}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Post('create-membership')  
	async createMembership(
    @Body() createMembershipDTO: MembershipDTO,
    @Body('user_id', new ParseIntPipe()) user_id: number
    ): Promise<MembershipEntity>{
		const membershipEntity = new MembershipEntity();
    Object.assign(membershipEntity, createMembershipDTO);
		return await this.membershipService.createMembership(membershipEntity, user_id);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Get(':id')
  async getMembershipById(@Param('id') id: number,): Promise<MembershipEntity> {
    return await this.membershipService.getMembershipById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get(':id')
	@Get('get-all-memberhips')
  async getAllMemberships(): Promise<MembershipEntity[]> {
    return await this.membershipService.getAllMemberships();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Put(':id')
  async updateMembershipById(@Param('id') id: number, @Body() updateMembershipDTO: MembershipDTO): Promise<MembershipEntity> {
    const updatedMembership = new MembershipEntity();
    Object.assign(updatedMembership, updateMembershipDTO);
    return await this.membershipService.updateMembershipById(id, updatedMembership);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Delete(':id')
  async deleteMembershipById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.membershipService.deleteMembershipById(id);
  }


  //сделать getMembershipByUserId для юзера (аналог getSubscriptionByID)
}
