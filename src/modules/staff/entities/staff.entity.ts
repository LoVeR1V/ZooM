import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SpecialityEntity } from "./speciality.entity";
import { LicenseEntity } from "./license.entity";
import { AnimalEntity } from "src/modules/animals/entities/animals.entity";
import { HealthMonitoringEntity } from "src/modules/health_monitoring/entities/health-monitoring.entity";

@Entity('staff')
export class StaffEntity {
  @PrimaryGeneratedColumn()
  id_staff: number;

	@Column()
	name: string;

	@Column()
	surname: string;

	@Column()
  email: string;

	@Column()
	phone: string;

	@Column()
  address: string;

	@Column({ type: 'date' })
	works_from: string;

	@Column({ type: 'decimal' })
	salary: number;

	@Column({ type: 'date' })
	birthdate: string;

	@ManyToOne(() => SpecialityEntity, (spec) => spec.staff1, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'speciality_id'})
  speciality: SpecialityEntity;

	@ManyToOne(() => LicenseEntity, (lic) => lic.staff1, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'license_id'})
  license: LicenseEntity;

	@ManyToOne(() => AnimalEntity, (animal) => animal.staff1, {
		onUpdate: 'CASCADE',
		onDelete: 'RESTRICT'
	})
	@JoinColumn({name: 'animal_id'})
	animal: AnimalEntity[];

	@OneToMany(() => HealthMonitoringEntity, (monitorings) => monitorings.staff)
  monitorings: HealthMonitoringEntity;


}