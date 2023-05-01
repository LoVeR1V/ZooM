import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TourEntity } from './entities/tour.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToursService {

	constructor(
    @InjectRepository(TourEntity)
    private tourRepository: Repository<TourEntity>,
  ) {}

}
