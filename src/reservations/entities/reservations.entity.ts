import { IReservation } from '../../interfaces/reservations.interface';
import { UsersReservationsEntity } from '../../users/entities/usersReservations.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationsEntity extends BaseEntity implements IReservation {
  @PrimaryColumn()
  date: Date;
  @Column()
  description: string;
  @Column()
  hour: string;
  @Column()
  place: string;
  @OneToMany(() => UsersReservationsEntity, (usersReservations) =>  usersReservations.reservation)  
  usersIncludes: UsersReservationsEntity[]
}
