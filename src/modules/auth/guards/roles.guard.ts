import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRoleEntity } from "src/modules/users/entities/user-role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		@InjectRepository(UserRoleEntity)
		private readonly userRoleRepository: Repository<UserRoleEntity>,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
		if (!requiredRoles) {
      return true;  //If no role is defined for a given router, allow access
    }
		const request = context.switchToHttp().getRequest();
    const authEntity = request.user;

		if (!authEntity.user_role_id) {
      return false;
    }

		const authEntityRole = await this.userRoleRepository.findOne({ 
      where: {
        id_user_role: authEntity.user_role_id,
      }
   });

  
    if (!authEntityRole) {
      return false;
    }
    return requiredRoles.some((role) => role === authEntityRole.name_role); //is used to check if the user.roles array contains at least one of the required requiredRoles.

	}
}