import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
     return await this.userRepository.save(user);
    }

   async getUserById(id: number): Promise<UserEntity> {
      return await this.userRepository.findOne({
        where: {id_user:id},
      })
    }

   async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async updateUserById(id: number, updatedUser: UserEntity): Promise<UserEntity> {
  const user = await this.userRepository.findOne({
        where: {id_user:id},
      })

  if (!user) {
    throw new NotFoundException(`user with ID ${id} not found`);
  }
  Object.assign(user, updatedUser);
  return await this.userRepository.save(user);
  }

   async deleteUserById(id: number, user?: any): Promise<void> {
  
    const result = await this.userRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

}
