import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IReservation } from '../../interfaces/reservations.interface';
import { UsersReservationsEntity } from '../../users/entities/usersReservations.entity';
import { ReservationEarringsEntity } from './reservationEarrings.entity';

@Entity({ name: 'reservations' })
export class ReservationsEntity extends BaseEntity implements IReservation {
  @Column()
  place: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  hour: string;

  @OneToMany(
    () => UsersReservationsEntity,
    (usersReservations) => usersReservations.reservation,
  )
  usersIncludes: UsersReservationsEntity[];

  @OneToMany(
    () => ReservationEarringsEntity,
    (reservationsEarring) => reservationsEarring.reservation,
  )
  earringsIncludes: ReservationEarringsEntity[];
}
