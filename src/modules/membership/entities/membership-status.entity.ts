import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MembershipEntity } from "./membership.entity";

@Entity('membership_status')
export class MembershipStatusEntity {

  @PrimaryGeneratedColumn()
  id_membership_status: number;

  @Column()
  name_mem_status: string;

  @OneToMany(() => MembershipEntity, (membership) => membership.membership_status_id)
  memberships: MembershipEntity[];
}