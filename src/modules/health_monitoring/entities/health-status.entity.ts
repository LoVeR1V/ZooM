import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HealthMonitoringEntity } from "./health-monitoring.entity";

@Entity('health_status')
export class HealthStatusEntity {
  
  @PrimaryGeneratedColumn()
  id_health_status: number;

  @Column()
  name_health_status: string;

  @OneToMany(() => HealthMonitoringEntity, (health_status) => health_status.health_status_id)
  health_status: HealthMonitoringEntity[];

}