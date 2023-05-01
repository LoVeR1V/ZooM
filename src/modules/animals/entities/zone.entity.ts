import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AnimalEntity } from "./animals.entity";
import { TourEntity } from "src/modules/tours/entities/tour.entity";

@Entity('zone')
export class ZoneEntity {
	@PrimaryGeneratedColumn()
	id_zone: number;

	@Column()
	name_zone: string;

	@Column({type: 'mediumtext'})
	about: string;

	@OneToMany(() => AnimalEntity,(animal) => animal.zone)
	animals: AnimalEntity[];

	@OneToMany(() => TourEntity,(tour) =>tour.zone)
	tours: TourEntity[];

}