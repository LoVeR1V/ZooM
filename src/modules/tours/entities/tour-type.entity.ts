import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TourEntity } from "./tour.entity";

@Entity('tour_type')
export class TourTypeEntity {
  
  @PrimaryGeneratedColumn()
  id_tour_type: number;

  @Column()
  name_tour_type: string;

	@Column({type: 'mediumtext'})
  descr: string;

  @OneToMany(() => TourEntity, (tour) => tour.tour_type)
  tours: TourEntity[];

}