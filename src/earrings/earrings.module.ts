import { Module } from '@nestjs/common';
import { EarringsService } from './services/earrings.service';
import { EarringsController } from './controllers/earrings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarringsEntity } from './entities/earrings.entity';
import { ReservationsEntity } from '../reservations/entities/reservations.entity';
import { ReservationsService } from '../reservations/services/reservations.service';
import { ReservationEarringsEntity } from '../reservations/entities/reservationEarrings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EarringsEntity,
      ReservationsEntity,
      ReservationEarringsEntity,
    ]),
  ],
  providers: [EarringsService, ReservationsService],
  controllers: [EarringsController],
})
export class EarringsModule {}
