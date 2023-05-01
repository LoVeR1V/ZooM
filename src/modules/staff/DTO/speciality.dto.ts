import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class SpecialityDTO {
	@IsInt()
	id_speciality: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_speciality: string;
}
