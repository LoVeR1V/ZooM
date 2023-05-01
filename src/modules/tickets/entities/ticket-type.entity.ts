import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";

@Entity('ticket_type')
export class TicketTypeEntity {
  
  @PrimaryGeneratedColumn()
  id_ticket_type: number;

  @Column()
  name_ticket_type: string;

	@Column({type: 'mediumtext'})
  description: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.ticket_type_id)
  tickets: TicketEntity[];
}