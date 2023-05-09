import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketsService {

	 constructor(
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
  ) {}

  async createTicket(ticket: TicketEntity): Promise<TicketEntity> {
     return await this.ticketRepository.save(ticket);
    }

  async getTicketById(id: number): Promise<TicketEntity> {
      return await this.ticketRepository.findOne({
        where: {id_ticket:id},
      })
    }

  async getAllTickets(): Promise<TicketEntity[]> {
    return await this.ticketRepository.find();
  }

  async updateTicketById(id: number, updatedTicket: TicketEntity): Promise<TicketEntity> {
  const ticket = await this.ticketRepository.findOne({
        where: {id_ticket:id},
      })

  if (!ticket) {
    throw new NotFoundException(`ticket with ID ${id} not found`);
  }
  Object.assign(ticket, updatedTicket);
  return await this.ticketRepository.save(ticket);
  }

  async deleteTicketById(id: number, user?: any): Promise<void> {
  
    const result = await this.ticketRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
  }
}
