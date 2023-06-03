import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor (
		private authService: AuthService,
		private readonly configService: ConfigService,
		) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	  async validate(payload: any) {
    let validatedEntity;
    if (payload.user_role_id === 1 || payload.user_role_id === 3) {
      validatedEntity = await this.authService.validateUserById(payload.id);
    } 
  
    if (!validatedEntity) {
      throw new UnauthorizedException();
    }
  
    return { 
      ...validatedEntity, 
      user_role_id: payload.user_role_id, 
      // role_name: validatedEntity.user_role.role_name  ?)
    };
  }
}