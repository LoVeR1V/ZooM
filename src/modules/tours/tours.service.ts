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

  async createTour(tour: TourEntity): Promise<TourEntity> {
     return await this.tourRepository.save(tour);
    }


  async getTourById(id: number): Promise<TourEntity> {
      return await this.tourRepository.findOne({
        where: {id_tour:id},
      })
    }  

  async getAllTours(): Promise<TourEntity[]> {
    return await this.tourRepository.find();
  }

  async updateTourById(id: number, updatedTour: TourEntity): Promise<TourEntity> {
  const tour = await this.tourRepository.findOne({
        where: {id_tour:id},
      })

  if (!tour) {
    throw new NotFoundException(`tour with ID ${id} not found`);
  }
  Object.assign(tour, updatedTour);
  return await this.tourRepository.save(tour);
  }

  async deleteTourById(id: number, user?: any): Promise<void> {
  
    const result = await this.tourRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`tour with id ${id} not found`);
    }
  }
}
