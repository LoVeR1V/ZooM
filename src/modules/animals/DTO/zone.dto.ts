import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class ZoneDTO {
	@IsInt()
	id_zone: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_zone: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	about: string;
}