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

}
