import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class TourTypeDTO {
	@IsInt()
	id_tour_type: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_tour_type: string;

	@IsString()
	@MaxLength(1000)
	descr: string;

}