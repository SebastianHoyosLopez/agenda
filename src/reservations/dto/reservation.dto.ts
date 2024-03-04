import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ReservationsEntity } from '../entities/reservations.entity';
import { EarringsEntity } from '../../earrings/entities/earrings.entity';
import { ACCESS_LEVEL } from '../../constants/roles';

export class ReservationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hour: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place: string;
}

export class ReservationUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  date: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hour: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  place: string;
}

export class ReservationToEarringDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  reservation: ReservationsEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  earring: EarringsEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}

export class FilterReservationsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
