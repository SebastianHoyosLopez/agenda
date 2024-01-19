import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

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

export class FilterReservationsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
