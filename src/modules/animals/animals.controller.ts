import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDTO } from './DTO/animals.dto';
import { AnimalEntity } from './entities/animals.entity';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('animals')
export class AnimalsController {
	constructor(private readonly animalsService: AnimalsService){
		
	}
	
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Post('create-animal')
	async createAnimal(@Body() createAnimalDTO: AnimalDTO ): Promise<AnimalEntity>{
		const animalEntity = new AnimalEntity();
    Object.assign(animalEntity, createAnimalDTO);
		return await this.animalsService.createAnimal(animalEntity);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Get(':id')
  async getAnimalById(@Param('id') id: number): Promise<AnimalEntity> {
    return await this.animalsService.findAnimalById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Get('get-all-animals')
  async getAllAnimals(): Promise<AnimalEntity[]> {
    return await this.animalsService.getAllAnimals();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Put(':id')
  async updateAnimalById(@Param('id') id: number, @Body() updateAnimalDTO: AnimalDTO): Promise<AnimalEntity> {
    const updatedAnimal = new AnimalEntity();
    Object.assign(updatedAnimal, updateAnimalDTO);
    return await this.animalsService.updateAnimalById(id, updatedAnimal);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
	@Delete(':id')
  async deleteAnimalById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.animalsService.deleteAnimalById(id);
  }

//  @Get('get-animal-zone')
//   async getAnimalForZone(
//     @Req() req,
//   ): Promise<AnimalEntity[]> {
//     return await this.animalsService.getAnimalForZone(req.user);
//   }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'vet')
  @Get('by-zone/:zoneId')
  async getAnimalsByZoneId(@Param('zoneId') zoneId: number): Promise<AnimalEntity[]> {
  return await this.animalsService.getAnimalsByZoneId(zoneId);
  }

}
