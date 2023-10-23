import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from './entities/reservations.entity';
import { ReservationsController } from './controllers/reservations.controller';
import { UsersReservationsEntity } from 'src/users/entities/usersReservations.entity';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationsEntity, UsersReservationsEntity])
  ],
  providers: [ReservationsService, UsersService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
