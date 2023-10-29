import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { EarringsService } from '../services/earrings.service';
import { EarringsDTO } from '../dto/earrings.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Earrings')
@Controller('earrings')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class EarringsController {
  constructor(private readonly earringsService: EarringsService) {}

  @ApiParam({
    name: 'reservationId',
  })
  @AccessLevel('DEVELOPER')
  @Post('create/:reservationId')
  public async createEarring(
    @Body() body: EarringsDTO,
    @Param('reservationId') reservationId: string,
  ) {
    return this.earringsService.createEarring(body, reservationId);
  }
}
