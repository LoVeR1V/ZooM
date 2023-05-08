import { Injectable, NotFoundException, Param, Put } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthMonitoringService {
	constructor(
    @InjectRepository(HealthMonitoringEntity)
    private healthRepository: Repository<HealthMonitoringEntity>,
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

}
