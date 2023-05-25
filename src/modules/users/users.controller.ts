import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './DTO/user.dto';
import { UserEntity } from './entities/user.entity';
import { async } from 'rxjs';
import { TicketEntity } from '../tickets/entities/ticket.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService){

	}

	@Post('create-user')
	async createUser(@Body() createUserDTO: UserDTO ): Promise<UserEntity>{
		const userEntity = new UserEntity();
    Object.assign(userEntity, createUserDTO);
		return await this.usersService.createUser(userEntity);	
	}

	@Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.getUserById(id);
  }

	@Get('get-all-users')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

	@Put(':id')
  async updateUserById(@Param('id') id: number, @Body() updateUserDTO: UserDTO): Promise<UserEntity> {
    const updatedUser = new UserEntity();
    Object.assign(updatedUser, updateUserDTO);
    return await this.usersService.updateUserById(id, updatedUser);
  }

	@Delete(':id')
  async deleteUserById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.usersService.deleteUserById(id);
  }

  // @Get('get-user-tickets/:id')
  // async getUserTickets(@Param('id') id: number): Promise<TicketEntity[]> {
  // return await this.usersService.getUserTickets(id);
  // } catch (error) {
  //   console.log(error); // Выводим ошибку в консоль для отладки
  //   throw error; // Пробрасываем ошибку выше
  // }
}
