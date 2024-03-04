import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './services/reservations.service';
import { ReservationsEntity } from './entities/reservations.entity';
import { ReservationsController } from './controllers/reservations.controller';
import { UsersReservationsEntity } from '../users/entities/usersReservations.entity';
import { UsersService } from '../users/services/users.service';
import { ReservationEarringsEntity } from './entities/reservationEarrings.entity';
import { ReservationFinancesEntity } from './entities/reservationFinances.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersReservationsEntity,
      ReservationEarringsEntity,
      ReservationsEntity,
      ReservationFinancesEntity,
    ]),
  ],
  providers: [ReservationsService, UsersService],
  controllers: [ReservationsController],
  exports: [ReservationsService, TypeOrmModule],
})
export class ReservationsModule {}
