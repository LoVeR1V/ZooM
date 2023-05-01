import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";

@Entity('ticket_status')
export class TicketStatusEntity {
  
  @PrimaryGeneratedColumn()
  id_ticket_status: number;

  @Column()
  name_ticket_status: string;

	@OneToMany(() => TicketEntity, (ticket) => ticket.ticket_status_id)
  tickets: TicketEntity[];
 

}