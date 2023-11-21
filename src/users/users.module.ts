import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./domain/users.entity";
import {UsersRepository} from "./users.repository";

@Module({
  imports : [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController]
})
export class UsersModule {}
