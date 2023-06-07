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

  
  //   async getUserTickets(user: any): Promise<TicketEntity[]> {
  //   if (!user) {
  //     throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
  //   }

  //   const reqUser = await this.usersService.getUserById(user.id_user);

  //   if (!reqUser) {
  //     throw new HttpException('Requested user not found', HttpStatus.NOT_FOUND);
  //   }

  //   const tickets = await this.ticketRepository.find({
  //     where: {user: reqUser},
  //   })

  //   if (user.name_role !== 'admin' && user.id_user !== reqUser.id_user) {
  //     throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  //   }

  //   if(user.name_role == 'vet') {
  //     throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
  //   }

  //   return tickets;
  // }

//работает с авторизованным юзером
  async getUserTickets(id: number, user: any): Promise<TicketEntity[]> {
    
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

    

    if (user.name_role !== 'admin' && user.id_user !== requiredUser.id_user) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    if(user.name_role == 'vet') {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    return await tickets;
  }

//тест того шо выше
  async getUserTicketsById(user_id: number): Promise<TicketEntity[]> {

    if (!user_id) {
      throw new HttpException('User object not provided', HttpStatus.BAD_REQUEST);
    }
    
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
