import { Column, Entity, OneToMany } from 'typeorm';
import { ROLES } from '../../constants/roles';
import { IUser } from '../../interfaces/user.interface';
import { BaseEntity } from '../../config/base.entity';
import { Exclude } from 'class-transformer';
import { UsersReservationsEntity } from './usersReservations.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(
    () =>  UsersReservationsEntity, 
    (usersReservation) => usersReservation.user
  )
  reservationsIncludes: UsersReservationsEntity[];
}
