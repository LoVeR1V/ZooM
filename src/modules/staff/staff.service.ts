import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StaffEntity } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class StaffService {
	constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
  ) {}
}
