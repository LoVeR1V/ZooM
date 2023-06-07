import { HttpException, HttpStatus, Injectable, NotFoundException, Param, Put } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnimalEntity } from './entities/animals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ZoneEntity } from './entities/zone.entity';


@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
    @InjectRepository(ZoneEntity)
    private readonly zoneRepository: Repository<ZoneEntity>,
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
  const queryBuilder = this.animalRepository.createQueryBuilder('animal');
  
  const result = await queryBuilder.getMany();
  console.log(result);
  return result;
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



  async getAnimalsByZoneId(zoneId: number): Promise<AnimalEntity[]> {
  return await this.animalRepository.find({
    where: { zone: { id_zone: zoneId } },
    });
  }

}
