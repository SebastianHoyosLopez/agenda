import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FinancesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  financeIncome: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  financeResidual: number;
}
