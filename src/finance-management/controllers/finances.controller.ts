import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinancesService } from '../services/finances.service';
import { FinancesDTO } from '../dto/finances.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@ApiTags('Finances')
@Controller('finances')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @PublicAccess()
  @Get('all')
  public async findAllFinances() {
    return await this.financesService.findAllFinances();
  }

  @Post('create/:reservationId')
  public async createFinance(
    @Body() body: FinancesDTO,
    @Param('reservationId') reservationId: string,
  ) {
    return this.financesService.createFinances(body, reservationId);
  }
}
