import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ToursService } from './tours.service';
import { TourDTO } from './DTO/tour.dto';
import { TourEntity } from './entities/tour.entity';
import { async } from 'rxjs';

@Controller('tours')
export class ToursController {
	constructor(private readonly toursService: ToursService) {

	}

	@Post('create-tour')
	async createTour(@Body() createTourDTO: TourDTO ): Promise<TourEntity>{
		const tourEntity = new TourEntity();
    Object.assign(tourEntity, createTourDTO);
		return await this.toursService.createTour(tourEntity);	
	}

	@Get(':id')
  async getTourById(@Param('id') id: number): Promise<TourEntity> {
    return await this.toursService.getTourById(id);
  }

	@Get('get-all-tours')
  async getAllTours(): Promise<TourEntity[]> {
    return await this.toursService.getAllTours();
  }

	@Put(':id')
  async updateTourById(@Param('id') id: number, @Body() updateTourDTO: TourDTO): Promise<TourEntity> {
    const updatedTour = new TourEntity();
    Object.assign(updatedTour, updateTourDTO);
    return await this.toursService.updateTourById(id, updatedTour);
  }

	@Delete(':id')
  async deleteTourById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.toursService.deleteTourById(id);
  }
}
