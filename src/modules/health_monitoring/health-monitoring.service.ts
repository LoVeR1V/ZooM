import { Injectable, NotFoundException, Param, Put } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class HealthMonitoringService {
	constructor(
    @InjectRepository(HealthMonitoringEntity)
    private readonly healthRepository: Repository<HealthMonitoringEntity>,
    private readonly staffService: StaffService,
  ) {}

    async createHealth(health: HealthMonitoringEntity): Promise<HealthMonitoringEntity> {
     return await this.healthRepository.save(health);
    }

     async getHealtById(id: number): Promise<HealthMonitoringEntity> {
      return await this.healthRepository.findOne({
        where: {id_health:id},
      })
    }

    async getAllHealths(): Promise<HealthMonitoringEntity[]> {
    return await this.healthRepository.find();
  }

  async updateHealthById(id: number, updatedHealth: HealthMonitoringEntity): Promise<HealthMonitoringEntity> {
  const health = await this.healthRepository.findOne({
        where: {id_health:id},
      })

  if (!health) {
    throw new NotFoundException(`health with ID ${id} not found`);
  }
  Object.assign(health, updatedHealth);
  return await this.healthRepository.save(health);
}

  async deleteHealthById(id: number, user?: any): Promise<void> {
  
    const result = await this.healthRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Health with id ${id} not found`);
    }
  }

    async createHealing(heal: HealthMonitoringEntity, staff_id: number): Promise<HealthMonitoringEntity> {
    const heal_staff = await this.staffService.getStaffById(staff_id);
  
    if (!heal_staff) {
      throw new NotFoundException(`Staff with id ${staff_id} not found`);
    }
  
    heal.staff = heal_staff;
  
    return await this.healthRepository.save(heal);
  }

}
