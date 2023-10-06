import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from './entities/reservations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationsEntity])
  ],
  providers: [ReservationsService]
})
export class ReservationsModule {}
