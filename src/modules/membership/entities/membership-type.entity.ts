import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MembershipEntity } from "./membership.entity";

@Entity('membership_type')
export class MembershipTypeEntity {

  @PrimaryGeneratedColumn()
  id_membership_type: number;

  @Column()
  name_mem_type: string;

  @OneToMany(() => MembershipEntity, (membership) => membership.membership_type_id)
  memberships: MembershipEntity[];
}