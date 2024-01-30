import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './services/reservations.service';
import { ReservationsEntity } from './entities/reservations.entity';
import { ReservationsController } from './controllers/reservations.controller';
import { UsersReservationsEntity } from '../users/entities/usersReservations.entity';
import { UsersService } from '../users/services/users.service';
import { ReservationEarringsEntity } from './entities/reservationEarrings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEarringsEntity,
      ReservationsEntity,
      UsersReservationsEntity,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, UsersService],
  exports: [ReservationsService, TypeOrmModule],
})
export class ReservationsModule {}
