import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import { TicketStatusDTO } from  "./ticket-status.dto";
import { TicketTypeDTO } from  "./ticket-type.dto";

export class MembershipDTO {
	@IsInt()
	id_ticket: number;

	@IsDateString()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;


	@IsNotEmpty()
  @IsString()
  time: string;

	@IsNumber()
  @IsNotEmpty()
  price: number;

	@IsNotEmpty()
  @IsString()
  created_at: string; //there is datetime type

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  ticket_status_id: number;

	@IsOptional()
  @IsInt()
  @Transform(({ value }) => value === undefined || value === '' ? 1 : parseInt(value, 10))
  ticket_type_id: number;

	@IsInt()
  @IsNotEmpty()
  user_id: number;

	@IsInt()
  @IsNotEmpty()
  tour_id: number;

}