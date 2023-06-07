import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { TourDTO } from './DTO/tour.dto';
import { TourEntity } from './entities/tour.entity';
import { async } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tours')
export class ToursController {
	constructor(private readonly toursService: ToursService) {

	}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Post('create-tour')
	async createTour(@Body() createTourDTO: TourDTO ): Promise<TourEntity>{
		const tourEntity = new TourEntity();
    Object.assign(tourEntity, createTourDTO);
		return await this.toursService.createTour(tourEntity);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get(':id')
  async getTourById(@Param('id') id: number): Promise<TourEntity> {
    return await this.toursService.getTourById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get('get-all-tours')
  async getAllTours(): Promise<TourEntity[]> {
    return await this.toursService.getAllTours();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Put(':id')
  async updateTourById(@Param('id') id: number, @Body() updateTourDTO: TourDTO): Promise<TourEntity> {
    const updatedTour = new TourEntity();
    Object.assign(updatedTour, updateTourDTO);
    return await this.toursService.updateTourById(id, updatedTour);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Delete(':id')
  async deleteTourById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.toursService.deleteTourById(id);
  }

  

}
