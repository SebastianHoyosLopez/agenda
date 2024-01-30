import { Column, Entity, OneToMany } from 'typeorm';
import { STATUS_EARRING } from '../../constants/status-earring';
import { BaseEntity } from '../../config/base.entity';
// import { ReservationsEntity } from '../../reservations/entities/reservations.entity';
import { ReservationEarringsEntity } from '../../reservations/entities/reservationEarrings.entity';

@Entity({ name: 'earring' })
export class EarringsEntity extends BaseEntity {
  @Column()
  earringName: string;

  @Column()
  earringDescription: string;

  @Column({ type: 'enum', enum: STATUS_EARRING })
  status: STATUS_EARRING;

  @OneToMany(
    () => ReservationEarringsEntity,
    (reservationsEarrings) => reservationsEarrings.earring,
  )
  reservationsIncludes: ReservationEarringsEntity[];
}
