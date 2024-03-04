import { Module } from '@nestjs/common';
import { FinancesController } from './controllers/finances.controller';
import { FinancesService } from './services/finances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancesEntity } from './entities/finances.entity';
import { ReservationsService } from '../reservations/services/reservations.service';
import { ReservationsEntity } from '../reservations/entities/reservations.entity';
import { ReservationFinancesEntity } from '../reservations/entities/reservationFinances.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    ReservationsModule,
    TypeOrmModule.forFeature([
      FinancesEntity,
      ReservationsEntity,
      ReservationFinancesEntity,
    ]),
  ],
  providers: [FinancesService, ReservationsService],
  controllers: [FinancesController],
})
export class FinanceManagementModule {}
