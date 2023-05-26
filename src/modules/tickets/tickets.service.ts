import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class TicketsService {

	 constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    private readonly usersService: UsersService,
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

  async getTicketsByTourId(TourId: number): Promise<TicketEntity[]> {
  return await this.ticketRepository.find({
    where: { tour: { id_tour: TourId } },
    });
  }

  
// работает с авторизованным юзером
  async getUserTickets(user: any): Promise<TicketEntity[]> {
    if (!user) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }

    const requiredUser = await this.usersService.getUserById(user.id_user);

    if (!requiredUser) {
      throw new HttpException('Requested user not found', HttpStatus.NOT_FOUND);
    }

    const tickets = await this.ticketRepository.find({
      where: {user: requiredUser},
    })

    return tickets;
  }

//тест того шо выше
  async getUserTicketsById(user_id: number): Promise<TicketEntity[]> {
    
    const requiredUser = await this.usersService.getUserById(user_id);

    if (!requiredUser) {
      throw new HttpException('Requested user not found', HttpStatus.NOT_FOUND);
    }

    const tickets = await this.ticketRepository.find({
      where: {user: requiredUser},
    })

   

    return tickets;
  }

}
