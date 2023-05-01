import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StaffEntity } from "./staff.entity";

@Entity('speciality')
export class SpecialityEntity {
  
  @PrimaryGeneratedColumn()
  id_speciality: number;

  @Column()
  name_speciality: string;

  @OneToMany(() => StaffEntity, (staff) => staff.speciality)
  staff1: StaffEntity[];

}