import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { ReservationDTO, ReservationUpdateDTO } from '../dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post('create')
  public async createReservation(@Body() body: ReservationDTO) {
    return await this.reservationsService.createReservation(body);
  }
  z;
  @Get('all')
  public async findAllReservations() {
    return await this.reservationsService.findReservations();
  }

  @Get(':id')
  public async findReservationById(@Param('id') id: string) {
    return await this.reservationsService.findReservationsById(id);
  }

  @Put('edit/:id')
  public async updateReservation(
    @Param('id') id: string,
    @Body() body: ReservationUpdateDTO,
  ) {
    return await this.reservationsService.updateReservation(body, id);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.reservationsService.deleteReservation(id);
  }
}
