import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ZoneDTO } from  "./zone.dto";

export class AnimalDTO {
	@IsInt()
	id_animal: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	species: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	description: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	habitat: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	image_url: string;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  born_at: Date;

	@IsDateString()
  @Type(() => Date)
  died_at: Date;
	
	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  zone_id: number;
}