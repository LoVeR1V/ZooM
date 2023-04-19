import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TicketTypeEntity } from "./ticket-type.entity";
import { TicketStatusEntity } from "./ticket-status.entity";

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id_ticket: number;

	@Column({ type: 'date' })
	date: Date;

	@Column({ type: 'time' })
	time: string;

	@Column({type: 'decimal'})
	price: number;

	@Column({ type: 'date' })
	created_at: string;

	@ManyToOne(() => TicketTypeEntity, (type) => type.tickets, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'ticket_type_id'})
  ticket_type_id: TicketTypeEntity;

  @ManyToOne(() => TicketStatusEntity, (status) => status.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'ticket_status_id'})
  ticket_status_id: TicketStatusEntity;
}