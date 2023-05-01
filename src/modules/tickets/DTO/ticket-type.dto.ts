import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class TicketTypeDTO {
	@IsInt()
	id_ticket_type: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_ticket_type: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1000)
	description: string;

}