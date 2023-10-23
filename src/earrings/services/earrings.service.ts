import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarringsEntity } from '../entities/earrings.entity';
import { Repository } from 'typeorm';
import { ReservationsService } from '../../reservations/services/reservations.service';
import { EarringsDTO } from '../dto/earrings.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class EarringsService {
  constructor(
    @InjectRepository(EarringsEntity)
    private readonly earringRepository: Repository<EarringsEntity>,
    private readonly reservationService: ReservationsService,
  ) {}

  public async createEarring(
    body: EarringsDTO,
    reservationId: string,
  ): Promise<EarringsEntity> {
    try {
      const reservation =
        await this.reservationService.findReservationsById(reservationId);
      if (reservation === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se ha  encontrado la reservación',
        });
      }

      return await this.earringRepository.save({
        ...body,
        reservation,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
