import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StaffEntity } from "./staff.entity";

@Entity('license')
export class LicenseEntity {
  
  @PrimaryGeneratedColumn()
  id_license: number;

  @Column({type: 'date'})
  issued_at: string;

  @OneToMany(() => StaffEntity, (staff) => staff.license)
  staff1: StaffEntity[];
}