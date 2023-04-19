import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('animals')
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id_animal: number;

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

	@Column({ type: 'date' })
	died_at: string;

}