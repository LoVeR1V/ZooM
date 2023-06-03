import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDTO } from '../users/DTO/user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { SignInUserDTO } from '../users/DTO/sign-in-user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService) {}


	@Post('signUp')
		async signUpUser(@Body() createUserDTO: UserDTO): Promise<UserEntity> {
			const userEntity = new UserEntity();
			Object.assign(userEntity,createUserDTO);
			return await this.authService.signUpUser(userEntity);
		}


	@Post('signIn') 
  async signInUser(@Body() signInUserDTO: SignInUserDTO) {
    const user = await this.authService.validateUser(signInUserDTO.email, signInUserDTO.password);

    if(!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return await this.authService.signInUser(user);
  	}
	}

	

