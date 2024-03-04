import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ReservationFinancesEntity } from '../../reservations/entities/reservationFinances.entity';

@Entity({ name: 'finance' })
export class FinancesEntity extends BaseEntity {
  @Column({ type: 'integer' })
  financeIncome: number;

  @Column({ type: 'integer' })
  financeResidual: number;

  @OneToOne(
    () => ReservationFinancesEntity,
    (reservationFinances) => reservationFinances.finance,
  )
  reservationInclude: ReservationFinancesEntity;
}
