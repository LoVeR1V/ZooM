import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config'; //+

@Injectable()
export class AuthService {	
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
		private readonly configService: ConfigService,)/* + */ {}

	// async validateUser(email: string, password: string) Promise
  async validateUser(email: string, password: string): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.usersService.getUserByEmail(email);

    if(user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

	async signUpUser(user: UserEntity): Promise<UserEntity | null> {
		const createdUser = await this.usersService.createUser(user);
		return createdUser;
	}

	async signInUser(user: Omit<UserEntity, 'password'>) {
		const payload = {
			id: user.id_user,
			email: user.email,
			name: user.name,
			surname: user.surname,
			user_role_id: user.user_role_id.id_user_role,
			user_role_name: user.user_role_id.name_role,
		};

		const expiresIn = '1h';
		return {
			access_token: this.jwtService.sign(payload,{
			secret: this.configService.get('JWT_SECRET'), expiresIn}),

		};
	}

	  async validateUserById(id: number): Promise<UserEntity | null> {
    return await this.usersService.getUserById(id);
  }
}
