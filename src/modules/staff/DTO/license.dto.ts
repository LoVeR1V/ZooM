import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class LicenseDTO {
	@IsInt()
	id_license: number;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  issued_at: Date;

}