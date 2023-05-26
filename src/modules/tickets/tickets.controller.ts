import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketDTO } from './DTO/ticket.dto';
import { TicketEntity } from './entities/ticket.entity';
import { async } from 'rxjs';

@Controller('tickets')
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {

	}

	@Post('create-ticket')
	async createTicket(@Body() createTicketDTO: TicketDTO ): Promise<TicketEntity>{
		const ticketEntity = new TicketEntity();
    Object.assign(ticketEntity, createTicketDTO);
		return await this.ticketsService.createTicket(ticketEntity);	
	}

	@Get(':id')
  async getTicketById(@Param('id') id: number): Promise<TicketEntity> {
    return await this.ticketsService.getTicketById(id);
  }

	@Get('get-all-tickets')
  async getAllTickets(): Promise<TicketEntity[]> {
    return await this.ticketsService.getAllTickets();
  }

	@Put(':id')
  async updateTicketById(@Param('id') id: number, @Body() updateTicketDTO: TicketDTO): Promise<TicketEntity> {
    const updatedTicket = new TicketEntity();
    Object.assign(updatedTicket, updateTicketDTO);
    return await this.ticketsService.updateTicketById(id, updatedTicket);
  }

	@Delete(':id')
  async deleteTicketById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.ticketsService.deleteTicketById(id);
  }

  @Get('by-tour/:tourId')
  async getTicketsByTourId(@Param('tourId') TourId: number): Promise<TicketEntity[]> {
  return await this.ticketsService.getTicketsByTourId(TourId);
}

  //  @Get(':id/tickets')
  // async getUserTickets(@Param('id') id: number): Promise<TicketEntity[]> {
  //   return await this.usersService.getUserTickets(id);
  // }

  
//для авторизированого юзера
  // @Get('get-user-tickets')
  // async getUserTickets(
  //   @Req() req,
  // ): Promise<TicketEntity[]> {
  //   return await this.ticketsService.getUserTickets(req.user);
  // }
//тестовый того шо выше
  @Get('get-user-tickets/:user_id')
  async getUserTicketsById(
    @Param('user_id') user_id: number,
  ): Promise<TicketEntity[]> {
    return await this.ticketsService.getUserTicketsById(user_id);
  }

}
