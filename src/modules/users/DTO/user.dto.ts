import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, isInt } from "class-validator";
import { Transform, Type } from "class-transformer";
import { UserRoleDTO } from  "./user-role.dto";
import { UserStatusDTO } from  "./user-status.dto";

export class UserTO {
	@IsInt()
	id_user: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	surname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	@IsEmail()
	email: string;

	@MaxLength(255)
  @IsNotEmpty()
  password: string;

	@IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(10)
  phone: string;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  birthday: Date;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  user_status_id: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  user_role_id: number;

}