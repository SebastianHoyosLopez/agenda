import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReservationDTO {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsNotEmpty()
  @IsString()
  place: string;
}

export class ReservationUpdateDTO {
  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  hour: string;

  @IsOptional()
  @IsString()
  place: string;
}
