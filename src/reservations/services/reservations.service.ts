import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsEntity } from '../entities/reservations.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ReservationDTO, ReservationUpdateDTO } from '../dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationsEntity)
    private readonly reservationRepository: Repository<ReservationsEntity>,
  ) {}

  public async createReservation(
    body: ReservationDTO,
  ): Promise<ReservationsEntity> {
    try {
      return await this.reservationRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findReservations(
    body: ReservationDTO,
  ): Promise<ReservationsEntity[]> {
    try {
      return await this.reservationRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findReservationsById(id: string): Promise<ReservationsEntity> {
    try {
      return await this.reservationRepository
        .createQueryBuilder('reservation')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateReservation(
    body: ReservationUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const reservation: UpdateResult = await this.reservationRepository.update(
        id,
        body,
      );
      if (reservation.affected === 0) return undefined;
      return reservation;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteReservation(
    id: string,
  ): Promise<DeleteResult | undefined> {
    try {
      const reservation: DeleteResult =
        await this.reservationRepository.delete(id);
      if (reservation.affected === 0) return undefined;
      return reservation;
    } catch (error) {
      throw new Error(error);
    }
  }
}
