import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";
import { UserStatusEntity } from "./user-status.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column() 
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

	@Column()
  password: string;

  @Column()
  phone: string;

	@Column()
	birthdate: Date;

	@ManyToOne(() => UserRoleEntity, (role) => role.users, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'user_role_id'})
  user_role_id: UserRoleEntity;

  @ManyToOne(() => UserStatusEntity, (status) => status.users, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'client_status_id'})
  user_status_id: UserStatusEntity;

}
 