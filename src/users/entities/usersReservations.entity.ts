import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { UsersEntity } from '../../users/entities/users.entity';
import { ReservationsEntity } from '../../reservations/entities/reservations.entity';

@Entity({ name: 'users_reservation' })
export class UsersReservationsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.reservationsIncludes)
  user: UsersEntity;

  @ManyToOne(
    () => ReservationsEntity,
    (reservation) => reservation.usersIncludes,
  )
  reservation: ReservationsEntity; 
}
