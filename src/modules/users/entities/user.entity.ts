import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";
import { UserStatusEntity } from "./user-status.entity";
import { MembershipEntity } from "src/modules/membership/entities/membership.entity";
import { TicketEntity } from "src/modules/tickets/entities/ticket.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

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
  @JoinColumn({name: 'user_status_id'})
  user_status_id: UserStatusEntity;

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

	@Column({ type: 'date' })
	birthday: Date;

  @OneToMany(() => MembershipEntity, (memberships) => memberships.user)
  memberships: MembershipEntity[];
  
  @OneToMany(() => TicketEntity, (ticket) => ticket.user)
  tickets: TicketEntity[];

  //узнать, и если необходимо, то добавить связи, в которые идет user
}
 