import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StaffEntity } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class StaffService {
	constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
  ) {}

    async createStaff(staff: StaffEntity): Promise<StaffEntity> {
     return await this.staffRepository.save(staff);
    }

    async getStaffById(id: number): Promise<StaffEntity> {
      return await this.staffRepository.findOne({
        where: {id_staff:id},
      })
    }

    async getAllStaff(): Promise<StaffEntity[]> {
    return await this.staffRepository.find();
  }

  async updateStaffById(id: number, updatedStaff: StaffEntity): Promise<StaffEntity> {
  const staff = await this.staffRepository.findOne({
        where: {id_staff:id},
      })

  if (!staff) {
    throw new NotFoundException(`staff with ID ${id} not found`);
  }
  Object.assign(staff, updatedStaff);
  return await this.staffRepository.save(staff);
  }

   async deleteStaffById(id: number, user?: any): Promise<void> {
  
    const result = await this.staffRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Staff with id ${id} not found`);
    }
  }

}
