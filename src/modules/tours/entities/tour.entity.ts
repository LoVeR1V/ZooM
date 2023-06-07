import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TourTypeEntity } from "./tour-type.entity";
import { TicketEntity } from "src/modules/tickets/entities/ticket.entity";
import { ZoneEntity } from "src/modules/animals/entities/zone.entity";
import { AnimalEntity } from "src/modules/animals/entities/animals.entity";

@Entity('tours')
export class TourEntity {
  @PrimaryGeneratedColumn()
  id_tour: number;

	@ManyToOne(() => TourTypeEntity, (tour_type) => tour_type.tours, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'tour_type_id'})
  tour_type: TourEntity;

	@ManyToOne(() => ZoneEntity, (zone) => zone.tours, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'zone_id'})
  zone_id: TourEntity;

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

	@Column({ type: 'datetime' })  
	created_at: string;

	@OneToMany(() => TicketEntity, (ticket) => ticket.tour)
  tickets: TicketEntity[];

	@ManyToMany(() => AnimalEntity, (animal) => animal.tours)
	 @JoinTable({
    name: 'animals_and_tours', 
    joinColumn: { name: 'tour_id', referencedColumnName: 'id_tour' },
    inverseJoinColumn: { name: 'animal_id', referencedColumnName: 'id_animals' },
  })
	animals: AnimalEntity[];

}