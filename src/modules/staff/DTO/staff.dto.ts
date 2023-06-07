import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { LicenseDTO } from  "./license.dto";
import { SpecialityDTO } from  "./speciality.dto";

export class StaffDTO {
	@IsInt()
	id_staff: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  speciality_id: number;

	@IsInt()
  @IsNotEmpty()
  animal_id: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  license_id: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	surname: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	@IsEmail()
	email: string;

	@IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(10)
  phone: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	address: string;

	@IsDateString()
  @IsNotEmpty()
  works_from: Date;

	@IsNumber()
  @IsNotEmpty()
  salary: number;

	@IsDateString()
  @IsNotEmpty()
  birthdate: Date;

	

	

	

}