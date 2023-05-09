import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TicketTypeEntity } from "./ticket-type.entity";
import { TicketStatusEntity } from "./ticket-status.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { TourEntity } from "src/modules/tours/entities/tour.entity";

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id_ticket: number;

  @ManyToOne(() => UserEntity, (user) => user.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'user_id'})
  user_id: UserEntity;

  @ManyToOne(() => TicketTypeEntity, (type) => type.tickets, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'ticket_type_id'})
  ticket_type_id: TicketTypeEntity;

  @ManyToOne(() => TourEntity, (tour) => tour.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'tour_id'})
  tour: TourEntity;

  @ManyToOne(() => TicketStatusEntity, (status) => status.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'ticket_status_id'})
  ticket_status_id: TicketStatusEntity;

	@Column({ type: 'date' })
	date: Date;

	@Column({ type: 'time' })
	time: string;

	@Column({type: 'decimal'})
	price: number;

	@Column({ type: 'datetime' }) 
	created_at: string;

  


  


}