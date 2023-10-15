import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from './entities/reservations.entity';
import { ReservationsController } from './controllers/reservations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationsEntity])
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
