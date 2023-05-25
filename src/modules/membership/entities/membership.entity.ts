import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MembershipStatusEntity } from "./membership-status.entity";
import { MembershipTypeEntity } from "./membership-type.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Entity('membership')
export class MembershipEntity {
  @PrimaryGeneratedColumn()
  id_membership: number;

  @Column() 
  name_membership: string;

  @Column()
  discount: number;

  @Column({type: 'mediumtext'})
  benefits: string;

	@ManyToOne(() => MembershipStatusEntity, (membershipStatus) => membershipStatus.memberships, {
  	onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'membership_status_id'})
  membership_status_id: MembershipStatusEntity;

  @ManyToOne(() => MembershipTypeEntity, (membershipType) => membershipType.memberships, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'membership_type_id'})
  membership_type_id: MembershipTypeEntity;
  
  @ManyToOne(() => UserEntity, (user) => user.memberships, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT'
  })
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}