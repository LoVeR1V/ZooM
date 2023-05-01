import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class TicketStatusDTO {
	@IsInt()
	id_ticket_status: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(45)
	name_ticket_status: string;

}