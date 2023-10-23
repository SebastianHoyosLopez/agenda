import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { ReservationDTO, ReservationUpdateDTO } from '../dto/reservation.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('reservations')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async createReservation(
    @Body() body: ReservationDTO,
    @Param('userId') userId: string,
  ) {
    return await this.reservationsService.createReservation(body, userId);
  }
  @PublicAccess()
  @Get('all')
  public async findAllReservations() {
    return await this.reservationsService.findReservations();
  }

  @Get(':reservationId')
  public async findReservationById(@Param('reservationId') id: string) {
    return await this.reservationsService.findReservationsById(id);
  }

  @AccessLevel(50)
  @Put('edit/:reservationId')
  public async updateReservation(
    @Param('reservationId', new ParseUUIDPipe()) reservationId: string,
    @Body() body: ReservationUpdateDTO,
  ) {
    return await this.reservationsService.updateReservation(
      body,
      reservationId,
    );
  }

  @Delete('delete/:reservationId')
  public async deleteUser(
    @Param('reservationId', new ParseUUIDPipe()) reservationId: string,
  ) {
    return await this.reservationsService.deleteReservation(reservationId);
  }
}
