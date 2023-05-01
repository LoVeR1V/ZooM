import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembershipService {
	constructor(
    @InjectRepository(MembershipEntity)
    private tourRepository: Repository<MembershipEntity>,
  ) {}
}
