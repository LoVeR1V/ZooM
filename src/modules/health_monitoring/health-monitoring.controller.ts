import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { HealthMonitoringService } from './health-monitoring.service';
import { HealthMonitoringDTO } from './DTO/health-monitoring.dto';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { async } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('health-monitoring')
export class HealthMonitoringController {
	constructor(private readonly healthMonitoringService: HealthMonitoringService) {

	}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Post('create-health')
	async createHealth(@Body() createHealthDTO: HealthMonitoringDTO ): Promise<HealthMonitoringEntity>{
		const healthEntity = new HealthMonitoringEntity();
    Object.assign(healthEntity, createHealthDTO);
		return await this.healthMonitoringService.createHealth(healthEntity);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Get(':id')
  async getHealtById(@Param('id') id: number): Promise<HealthMonitoringEntity> {
    return await this.healthMonitoringService.getHealtById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Get('get-all-healths')
  async getAllHealths(): Promise<HealthMonitoringEntity[]> {
    return await this.healthMonitoringService.getAllHealths();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('vet')
	@Put(':id')
  async updateHealthById(@Param('id') id: number, @Body() updateHealthDTO: HealthMonitoringDTO): Promise<HealthMonitoringEntity> {
    const updatedHealth = new HealthMonitoringEntity();
    Object.assign(updatedHealth, updateHealthDTO);
    return await this.healthMonitoringService.updateHealthById(id, updatedHealth);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Delete(':id')
  async deleteHealthById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.healthMonitoringService.deleteHealthById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('vet')
  @Post('create-healing') 
  async createHealing(
    @Body() createHealDTO: HealthMonitoringDTO,
    @Body('staff_id', new ParseIntPipe()) staff_id: number
    ): Promise<HealthMonitoringEntity> {
    const heal = new HealthMonitoringEntity();
    Object.assign(heal, createHealDTO);
    return await this.healthMonitoringService.createHealing(heal, staff_id);
  }


}
