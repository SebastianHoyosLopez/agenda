import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { FinancesEntity } from '../../finance-management/entities/finances.entity';
import { ReservationsEntity } from './reservations.entity';

@Entity({ name: 'reservation_finances' })
export class ReservationFinancesEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @OneToOne(
    () => ReservationsEntity,
    (reservation) => reservation.financeInclude,
  )
  reservation: ReservationsEntity;

  @OneToOne(() => FinancesEntity, (finance) => finance.reservationInclude)
  finance: FinancesEntity;
}
