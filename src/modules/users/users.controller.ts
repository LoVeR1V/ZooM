import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './DTO/user.dto';
import { UserEntity } from './entities/user.entity';
import { async } from 'rxjs';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get(':id')
  async findUserById(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get('get-all-users')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
	@Put(':id')
  async updateUserById(@Param('id') id: number,@Req() req, @Body() updatedUser: UserDTO): Promise<UserEntity | null> {
    const updatedUserEntity = new UserEntity();
    Object.assign(updatedUser, updatedUserEntity);
    return await this.usersService.updateUserById(id, updatedUserEntity, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
