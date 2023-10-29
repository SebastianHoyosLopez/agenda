import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_EARRING } from '../../constants/status-earring';
import { ReservationDTO } from '../../reservations/dto/reservation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EarringsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  earringName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  earringDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_EARRING)
  status: STATUS_EARRING;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsibleName: string;

  @ApiProperty()
  @IsOptional()
  reservation: ReservationDTO;
}
