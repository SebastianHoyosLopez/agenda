import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarringsEntity } from '../entities/earrings.entity';
import { Repository } from 'typeorm';
import { ReservationsService } from '../../reservations/services/reservations.service';
import { EarringsDTO } from '../dto/earrings.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { ReservationEarringsEntity } from 'src/reservations/entities/reservationEarrings.entity';
import { ACCESS_LEVEL } from 'src/constants/roles';

@Injectable()
export class EarringsService {
  constructor(
    @InjectRepository(EarringsEntity)
    private readonly earringRepository: Repository<EarringsEntity>,
    private readonly reservationService: ReservationsService,
    @InjectRepository(ReservationEarringsEntity)
    private readonly reservationEarringRepository: Repository<ReservationEarringsEntity>,
  ) {}

  public async findEarrings() {
    const earrings = await this.earringRepository
      .createQueryBuilder('earrings')
      .leftJoinAndSelect(
        'earrings.reservationsIncludes',
        'reservationsIncludes',
      )
      .leftJoinAndSelect('reservationsIncludes.reservation', 'reservation')
      .getMany();
    return earrings;
  }

  public async createEarring(
    body: EarringsDTO,
    reservationId: string,
  ): Promise<any> {
    try {
      const reservation =
        await this.reservationService.findReservationsById(reservationId);
      if (reservation === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se ha  encontrado la reservación',
        });
      }
      const createdEarring = await this.earringRepository.save(body);

      return await this.reservationEarringRepository.save({
        earring: createdEarring,
        reservation: reservation,
        accessLevel: ACCESS_LEVEL.OWNER,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
