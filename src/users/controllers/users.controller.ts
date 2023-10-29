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
import { UsersService } from '../services/users.service';
import { UserDTO, UserToReservationDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReservationsEntity } from 'src/reservations/entities/reservations.entity';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @PublicAccess()
  @Post('register')
  public async registersUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @PublicAccess()
  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @PublicAccess()
  @Get('all-relations')
  public async findAllRelations() {
    return await this.usersService.findRelations()
  }

  @ApiParam({
    name: 'userId',
  })
  @ApiHeader({
    name: 'agenda_token',
  })
  @PublicAccess()
  @Get(':userId')
  public async findUserById(@Param('userId') userId: string) {
    return await this.usersService.findUsersById(userId);
  }

  @ApiHeader({
    name: 'agenda_token',
  })
  @Post('add-to-reservation')
  public async addToReservation(
    @Body() body: UserToReservationDTO,
    @Param('reservationId', new ParseUUIDPipe()) reservationId: string,
  ) {
    return await this.usersService.relationToReservation(body);
  }

  @ApiParam({
    name: 'userId',
  })
  @ApiHeader({
    name: 'agenda_token',
  })
  @Put('edit/:userId')
  public async updateUser(
    @Param('userId') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiParam({
    name: 'userId',
  })
  @ApiHeader({
    name: 'agenda_token',
  })
  @Delete('delete/:userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @ApiParam({
    name: 'relationId',
  })
  @PublicAccess()
  @Delete('delete-relation/:relationId')
  public async deleteRelation(@Param("relationId") relationId: string) {
    return await this.usersService.deleteRelation(relationId)
  }
}
