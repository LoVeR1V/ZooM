import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { HealthStatusEntity } from "./health-status.entity";
import { AnimalEntity } from "src/modules/animals/entities/animals.entity";
import { StaffEntity } from "src/modules/staff/entities/staff.entity";


@Entity('health_monitoring')
export class HealthMonitoringEntity {
  @PrimaryGeneratedColumn()
  id_health: number;

  @ManyToOne(() => HealthStatusEntity, (h_status) => h_status.health_status, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'health_status_id'})
  health_status_id: HealthStatusEntity;

  @ManyToOne(() => StaffEntity, (staff) => staff.monitorings, {
		onUpdate: 'CASCADE',
		onDelete: 'RESTRICT'
	})
	@JoinColumn({name: 'staff_id'})
	staff: StaffEntity;


	@Column()
	diagnosis: string;

	@Column({type: 'mediumtext'})
	notes: string;

	@Column({type: 'date'})
  ill_start: string;

	@Column({type: 'date'})
	ill_end: string;

	@Column({type: 'mediumtext'})
	conclusion: string;

	
	@ManyToMany(() => AnimalEntity, (animal) => animal.monitorings)
  @JoinTable({
    name: 'health_and_animals', 
    joinColumn: { name: 'health_id', referencedColumnName: 'id_health' },
    inverseJoinColumn: { name: 'animal_id', referencedColumnName: 'id_animals' },
  })
  animals: AnimalEntity[];
	
}