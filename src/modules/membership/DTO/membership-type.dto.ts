import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class MembershipTypeDTO {
	@IsInt()
	id_membership_type: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_mem_type: string;

	@IsNumber()
  @IsNotEmpty()
  mem_type_price: number;
}