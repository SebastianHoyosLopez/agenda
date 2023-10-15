import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersReservationsEntity } from './entities/usersReservations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersReservationsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
