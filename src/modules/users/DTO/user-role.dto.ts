import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class UserRoleDTO {
	@IsInt()
	id_user_role: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_role: string;

}