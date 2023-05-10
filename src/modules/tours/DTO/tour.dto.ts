import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, isInt } from "class-validator";
import { Transform, Type } from "class-transformer";
import { TourTypeDTO } from  "./tour-type";

export class TourDTO {
	@IsInt()
	id_tour: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  tour_type_id: number;
		
	@IsInt()
  @IsNotEmpty()
  zone_id: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_tour: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	tour_descr: string;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  tour_date: Date;

	@IsNotEmpty()
  @IsString()
  tour_time: string;

	@IsNotEmpty()
  @IsInt()
  max_tickets: number

	@IsNotEmpty()
  @IsInt()
  remaining: number

	@IsNotEmpty()
  @IsString()
  created_at: string; //there is datetime type

}