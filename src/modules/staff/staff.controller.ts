import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDTO } from './DTO/staff.dto';
import { StaffEntity } from './entities/staff.entity';
import { async } from 'rxjs';


@Controller('staff')
export class StaffController {

	constructor(private readonly staffService: StaffService){
		
	}

	@Post('create-staff')
	async createStaff(@Body() createStaffDTO: StaffDTO ): Promise<StaffEntity>{
		const staffEntity = new StaffEntity();
    Object.assign(staffEntity, createStaffDTO);
		return await this.staffService.createStaff(staffEntity);	
	}

	@Get(':id')
  async getStaffById(@Param('id') id: number): Promise<StaffEntity> {
    return await this.staffService.getStaffById(id);
  }

	@Get('get-all-staff')
  async getAllStaff(): Promise<StaffEntity[]> {
    return await this.staffService.getAllStaff();
  }

	@Put(':id')
  async updateStaffById(@Param('id') id: number, @Body() updateStaffDTO: StaffDTO): Promise<StaffEntity> {
    const updatedStaff = new StaffEntity();
    Object.assign(updatedStaff, updateStaffDTO);
    return await this.staffService.updateStaffById(id, updatedStaff);
  }

	@Delete(':id')
  async deleteStaffById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.staffService.deleteStaffById(id);
  }

  @Get('by-speciality/:specialityId')
  async getStaffBySpecialityId(@Param('specialityId') zoneId: number): Promise<StaffEntity[]> {
  return await this.staffService.getStaffBySpecialityId(zoneId);
}

}
