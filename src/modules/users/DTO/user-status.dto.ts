import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class UserStatusDTO {
	@IsInt()
	id_user_status: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_user_status: string;

}