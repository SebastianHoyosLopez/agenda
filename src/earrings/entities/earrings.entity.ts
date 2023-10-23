import { STATUS_EARRING } from '../../constants/status-earring';
import { BaseEntity } from '../../config/base.entity';
import { ReservationsEntity } from '../../reservations/entities/reservations.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'earring' })
export class EarringsEntity extends BaseEntity {
  @Column()
  earringName: string;

  @Column()
  earringDescription: string;

  @Column({ type: 'enum', enum: STATUS_EARRING })
  status: STATUS_EARRING;

  @Column()
  responsibleName: string;
  @ManyToOne(() => ReservationsEntity, (reservation) => reservation.earrings)
  @JoinColumn({
    name: 'reservation_id',
  })
  reservation: ReservationsEntity;
}
