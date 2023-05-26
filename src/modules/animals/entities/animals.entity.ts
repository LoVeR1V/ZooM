import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ZoneEntity } from "./zone.entity";
import { StaffEntity } from "src/modules/staff/entities/staff.entity";
import { TourEntity } from "src/modules/tours/entities/tour.entity";
import { HealthMonitoringEntity } from "src/modules/health_monitoring/entities/health-monitoring.entity";

@Entity('animals')
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id_animals: number;

  @ManyToOne(() => ZoneEntity, (zone) => zone.animals, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'zone_id'})
  zone: ZoneEntity;

	@Column()
	name: string;

	@Column()
	species: string;

	@Column({type: 'mediumtext'})
  description: string;

	@Column()
	habitat: string;

	@Column({type: 'mediumtext'})
  image_url: string;

	@Column({ type: 'date' })
	born_at: string;

	@Column({ type: 'datetime' })
	died_at: string;

	@OneToMany(() => StaffEntity, (staff) => staff.animal)
	staff1: StaffEntity[];

	@ManyToMany(() => TourEntity, (tour) => tour.animals)
  // @JoinTable({
  //   name: 'animals_and_tours', 
  //   joinColumn: { name: 'animal_id', referencedColumnName: 'id_animals' },
  //   inverseJoinColumn: { name: 'tour_id', referencedColumnName: 'id_tour' },
  // })
  tours: TourEntity[];

	// @ManyToMany(() => HealthMonitoringEntity, (monitoring) => monitoring.animals, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'RESTRICT'
  // })
  // monitorings: HealthMonitoringEntity;

   @ManyToMany(() => HealthMonitoringEntity, (monitoring) => monitoring.animals)
  monitorings: HealthMonitoringEntity[];

}