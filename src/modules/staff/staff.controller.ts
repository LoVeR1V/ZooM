import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDTO } from './DTO/staff.dto';
import { StaffEntity } from './entities/staff.entity';
import { async } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('staff')
export class StaffController {

	constructor(private readonly staffService: StaffService){
		
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Post('create-staff')
	async createStaff(@Body() createStaffDTO: StaffDTO ): Promise<StaffEntity>{
		const staffEntity = new StaffEntity();
    Object.assign(staffEntity, createStaffDTO);
		return await this.staffService.createStaff(staffEntity);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get(':id')
  async getStaffById(@Param('id') id: number): Promise<StaffEntity> {
    return await this.staffService.getStaffById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get('get-all-staff')
  async getAllStaff(): Promise<StaffEntity[]> {
    return await this.staffService.getAllStaff();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Put(':id')
  async updateStaffById(@Param('id') id: number, @Body() updateStaffDTO: StaffDTO): Promise<StaffEntity> {
    const updatedStaff = new StaffEntity();
    Object.assign(updatedStaff, updateStaffDTO);
    return await this.staffService.updateStaffById(id, updatedStaff);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Delete(':id')
  async deleteStaffById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.staffService.deleteStaffById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('by-speciality/:specialityId')
  async getStaffBySpecialityId(@Param('specialityId') SpecId: number): Promise<StaffEntity[]> {
  return await this.staffService.getStaffBySpecialityId(SpecId);
}

}
