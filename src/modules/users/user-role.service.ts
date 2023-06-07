import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRoleEntity } from "./entities/user-role.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRoleService {

  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}


  async getUserRoleById(id: number): Promise<UserRoleEntity> {
    return await this.userRoleRepository.findOne({
      where: {
        id_user_role: id,
      }
    });
  }
  
}