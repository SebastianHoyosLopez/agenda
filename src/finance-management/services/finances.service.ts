import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancesEntity } from '../entities/finances.entity';
import { FinancesDTO } from '../dto/finances.dto';
import { ErrorManager } from '../../utils/error.manager';
import { ReservationsService } from '../../reservations/services/reservations.service';
import { ReservationFinancesEntity } from '../../reservations/entities/reservationFinances.entity';
import { ACCESS_LEVEL } from '../../constants/roles';

@Injectable()
export class FinancesService {
  constructor(
    @InjectRepository(FinancesEntity)
    private readonly financesRepository: Repository<FinancesEntity>,
    private readonly reservationService: ReservationsService,
    @InjectRepository(ReservationFinancesEntity)
    private readonly reservationFinanceRepository: Repository<ReservationFinancesEntity>,
  ) {}

  public async createFinances(
    body: FinancesDTO,
    reservationId: string,
  ): Promise<any> {
    try {
      const reservacion =
        await this.reservationService.findReservationsById(reservationId);
      if (reservacion === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se ha  encontrado la reservación',
        });
      }
      const createFinance = await this.financesRepository.save(body);

      return await this.reservationFinanceRepository.save({
        finance: createFinance,
        reservacion: reservacion,
        accessLevel: ACCESS_LEVEL.DEVELOPER,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllFinances() {
    const finances = await this.financesRepository
      .createQueryBuilder('finances')
      .getMany();
    return finances;
  }
}
