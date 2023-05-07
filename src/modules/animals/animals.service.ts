import { Injectable, NotFoundException, Param, Put } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnimalEntity } from './entities/animals.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalEntity)
    private animalRepository: Repository<AnimalEntity>,
  ) {}

    async createAnimal(animal: AnimalEntity): Promise<AnimalEntity> {
     return await this.animalRepository.save(animal);
    }

    async findAnimalById(id_animal: number): Promise<AnimalEntity> {
      return await this.animalRepository.findOne({
        where: {id_animals:id_animal},
      })
    }

  async getAllAnimals(): Promise<AnimalEntity[]> {
    return await this.animalRepository.find();
  }

async updateAnimalById(id_animal: number, updatedAnimal: AnimalEntity): Promise<AnimalEntity> {
  const animal = await this.animalRepository.findOne({
        where: {id_animals:id_animal},
      })

  if (!animal) {
    throw new NotFoundException(`Animal with ID ${id_animal} not found`);
  }
  Object.assign(animal, updatedAnimal);
  return await this.animalRepository.save(animal);
}  

async deleteAnimalById(id: number, user?: any): Promise<void> {
  
    const result = await this.animalRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }
  }

}
