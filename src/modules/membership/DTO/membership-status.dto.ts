import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class MembershipStatusDTO {
	@IsInt()
	id_membership_status: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_mem_status: string;

}