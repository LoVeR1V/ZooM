import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { HealthMonitoringService } from './health-monitoring.service';
import { HealthMonitoringDTO } from './DTO/health-monitoring.dto';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { async } from 'rxjs';

@Controller('health-monitoring')
export class HealthMonitoringController {
	constructor(private readonly healthMonitoringService: HealthMonitoringService) {

	}
	@Post('create-health')
	async createHealth(@Body() createHealthDTO: HealthMonitoringDTO ): Promise<HealthMonitoringEntity>{
		const healthEntity = new HealthMonitoringEntity();
    Object.assign(healthEntity, createHealthDTO);
		return await this.healthMonitoringService.createHealth(healthEntity);	
	}

	@Get(':id')
  async getHealtById(@Param('id') id: number): Promise<HealthMonitoringEntity> {
    return await this.healthMonitoringService.findHealthById(id);
  }

	@Get('get-all-healths')
  async getAllHealths(): Promise<HealthMonitoringEntity[]> {
    return await this.healthMonitoringService.getAllHealths();
  }

	@Put(':id')
  async updateHealthById(@Param('id') id: number, @Body() updateHealthDTO: HealthMonitoringDTO): Promise<HealthMonitoringEntity> {
    const updatedHealth = new HealthMonitoringEntity();
    Object.assign(updatedHealth, updateHealthDTO);
    return await this.healthMonitoringService.updateHealthById(id, updatedHealth);
  }

	@Delete(':id')
  async deleteHealthById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.healthMonitoringService.deleteHealthById(id);
  }


}
