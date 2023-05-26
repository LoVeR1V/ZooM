import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalDTO } from './DTO/animals.dto';
import { AnimalEntity } from './entities/animals.entity';


@Controller('animals')
export class AnimalsController {
	constructor(private readonly animalsService: AnimalsService){
		
	}
	
	@Post('create-animal')
	async createAnimal(@Body() createAnimalDTO: AnimalDTO ): Promise<AnimalEntity>{
		const animalEntity = new AnimalEntity();
    Object.assign(animalEntity, createAnimalDTO);
		return await this.animalsService.createAnimal(animalEntity);	
	}

	@Get(':id')
  async getAnimalById(@Param('id') id: number): Promise<AnimalEntity> {
    return await this.animalsService.findAnimalById(id);
  }

	@Get('get-all-animals')
  async getAllAnimals(): Promise<AnimalEntity[]> {
    return await this.animalsService.getAllAnimals();
  }

	@Put(':id')
  async updateAnimalById(@Param('id') id: number, @Body() updateAnimalDTO: AnimalDTO): Promise<AnimalEntity> {
    const updatedAnimal = new AnimalEntity();
    Object.assign(updatedAnimal, updateAnimalDTO);
    return await this.animalsService.updateAnimalById(id, updatedAnimal);
  }

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


  @Get('by-zone/:zoneId')
  async getAnimalsById(@Param('zoneId') zoneId: number): Promise<AnimalEntity[]> {
  return await this.animalsService.getAnimalsByZoneId(zoneId);
  }

}
