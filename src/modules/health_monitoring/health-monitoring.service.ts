import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HealthMonitoringEntity } from './entities/health-monitoring.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthMonitoringService {

	constructor(
    @InjectRepository(HealthMonitoringEntity)
    private healthRepository: Repository<HealthMonitoringEntity>,
  ) {}

}
