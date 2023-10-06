import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReservationDTO {
  @IsNotEmpty()
  @IsString()
  date: Date;
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
  date: Date;
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
