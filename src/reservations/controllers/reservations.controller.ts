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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('reservations')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post('create')
  public async createReservation(@Body() body: ReservationDTO) {
    return await this.reservationsService.createReservation(body);
  }

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
    @Param('reservationId', new ParseUUIDPipe()) id: string,
    @Body() body: ReservationUpdateDTO,
  ) {
    return await this.reservationsService.updateReservation(body, id);
  }

  @Delete('delete/:reservationId')
  public async deleteUser(
    @Param('reservationId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.reservationsService.deleteReservation(id);
  }
}
