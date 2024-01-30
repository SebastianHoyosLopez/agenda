import { Column, Entity, ManyToOne } from 'typeorm';
import { IsOptional } from 'class-validator';
import { ACCESS_LEVEL } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';
import { ReservationsEntity } from './reservations.entity';
import { EarringsEntity } from '../../earrings/entities/earrings.entity';

@Entity({ name: 'reservation_earrings' })
export class ReservationEarringsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(
    () => ReservationsEntity,
    (reservation) => reservation.earringsIncludes,
  )
  reservation: ReservationsEntity;

  @ManyToOne(() => EarringsEntity, (earring) => earring.reservationsIncludes)
  @IsOptional()
  earring: EarringsEntity;
}
