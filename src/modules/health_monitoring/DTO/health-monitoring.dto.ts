import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { HealthStatusDTO } from  "./health-status.dto";

export class HealthMonitoringDTO {
	@IsInt()
	id_heatlh: number;

	@IsInt()
  @IsNotEmpty()
  staff_id: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  health_status_id: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	diagnosis: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	notes: string;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  ill_start: Date;

	@IsDateString()
  @Type(() => Date)
  ill_end: Date;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	conclusion: string;

}