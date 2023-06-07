import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketDTO } from './DTO/ticket.dto';
import { TicketEntity } from './entities/ticket.entity';
import { async } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tickets')
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {

	}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Post('create-ticket')
	async createTicket(@Body() createTicketDTO: TicketDTO ): Promise<TicketEntity>{
		const ticketEntity = new TicketEntity();
    Object.assign(ticketEntity, createTicketDTO);
		return await this.ticketsService.createTicket(ticketEntity);	
	}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get(':id')
  async getTicketById(@Param('id') id: number): Promise<TicketEntity> {
    return await this.ticketsService.getTicketById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Get('get-all-tickets')
  async getAllTickets(): Promise<TicketEntity[]> {
    return await this.ticketsService.getAllTickets();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Put(':id')
  async updateTicketById(@Param('id') id: number, @Body() updateTicketDTO: TicketDTO): Promise<TicketEntity> {
    const updatedTicket = new TicketEntity();
    Object.assign(updatedTicket, updateTicketDTO);
    return await this.ticketsService.updateTicketById(id, updatedTicket);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
	@Delete(':id')
  async deleteTicketById(
    @Param('id') id: number,
  ): Promise<void> {
    return await this.ticketsService.deleteTicketById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('by-tour/:tourId')
  async getTicketsByTourId(@Param('tourId') TourId: number): Promise<TicketEntity[]> {
  return await this.ticketsService.getTicketsByTourId(TourId);
}
  
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin', 'user')
  // @Get('get-user-tickets/:user_id')
  // async getUserTickets(
  //   @Param('id') id: number,
  //   @Req() req,
  // ): Promise<TicketEntity[]> {
  //   return await this.ticketsService.getUserTickets(id,req.user);
  // }


//тестовый того шо выше
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get('get-user-tickets/:user_id')
  async getUserTicketsById(
    @Param('user_id') user_id: number,
  ): Promise<TicketEntity[]> {
    return await this.ticketsService.getUserTicketsById(user_id);
  }

}
