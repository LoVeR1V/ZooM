import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class HealthStatusDTO {
	@IsInt()
	id_health_status: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_health_status: string;

}