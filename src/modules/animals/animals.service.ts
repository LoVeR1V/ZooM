import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnimalEntity } from './entities/animals.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalEntity)
    private animalRepository: Repository<AnimalEntity>,
  ) {}



}