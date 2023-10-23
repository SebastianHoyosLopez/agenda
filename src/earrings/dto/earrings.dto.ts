import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_EARRING } from '../../constants/status-earring';
import { ReservationDTO } from '../../reservations/dto/reservation.dto';

export class EarringsDTO {
  @IsNotEmpty()
  @IsString()
  earringName: string;

  @IsNotEmpty()
  @IsString()
  earringDescription: string;

  @IsNotEmpty()
  @IsEnum(STATUS_EARRING)
  status: STATUS_EARRING;

  @IsOptional()
  @IsString()
  responsibleName: string;

  @IsOptional()
  reservation: ReservationDTO;
}
