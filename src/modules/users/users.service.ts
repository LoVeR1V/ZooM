import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TicketEntity } from '../tickets/entities/ticket.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.userRepository.save(user);
  }

   async getUserById(id: number, user?: any): Promise<UserEntity> {
      return await this.userRepository.findOne({
        where: {id_user: id},
        relations: ['user_role_id']
      })
    }

   async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async updateUserById(id: number, updatedUser: Partial<UserEntity>, jwt_user?: any): Promise<UserEntity> {

    if((jwt_user.name_role !== 'admin' && Number(jwt_user.id_user) !== Number(id)) || !(await this.getUserById(id, jwt_user)))
      {
        throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
      }

    const user = await this.userRepository.findOne({
          where: {id_user:id},
        })

    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    
    if (updatedUser.password) {   //hash password
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(updatedUser.password, salt);
    }
    
    return await this.userRepository.save(user);
    }

   async deleteUserById(id: number, user?: any): Promise<void> {
  
    const result = await this.userRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['user_role_id'] 
    });
  }


//   async getUserTickets(id: number): Promise<TicketEntity[]> {
//   const user = await this.getUserById(id);
//   if (!user) {
//     throw new NotFoundException(`User with ID ${id} not found`);
//   }
  
//   return user.tickets;
// }   catch (error) {
//     console.log(error); // Выводим ошибку в консоль для отладки
//     throw error; // Пробрасываем ошибку выше
//   }
}
