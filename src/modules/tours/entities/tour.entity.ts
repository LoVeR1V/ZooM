import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TicketTypeEntity } from "./tour-type.entity";

@Entity('tours')
export class TourEntity {
  @PrimaryGeneratedColumn()
  id_tour: number;

	@Column()
	name_tour: string;

	@Column({type: 'mediumtext'})
  tour_descr: string;

	@Column({ type: 'date' })
	tour_date: string;

	@Column({ type: 'time' })
	tour_time: string;

	@Column()
	max_tickets: number;

	@Column()
	remaining: number;

	@Column({ type: 'date' })  //что делать, если надо datetime?
	created_at: string;

	// добавить zone

}