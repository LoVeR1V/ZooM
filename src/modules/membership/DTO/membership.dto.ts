import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { MembershipStatusDTO } from  "./membership-status.dto";
import { MembershipTypeDTO } from  "./membership-type.dto";

export class MembershipDTO {
	@IsInt()
	id_membership: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_membership: string;

	@IsNumber()
  @IsNotEmpty()
  discount: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	benefits: string;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  membership_status_id: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  membership_type_id: number;

	@IsInt()
  @IsNotEmpty()
  user_id: number;

}