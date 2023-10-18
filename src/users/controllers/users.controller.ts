import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserToReservationDTO, UserUpdateDTO } from '../dto/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  public async registersUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @Roles('ADMIN')
  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @PublicAccess()
  @Get(':userId')
  public async findUserById(@Param('userId') id: string) {
    return await this.usersService.findUsersById(id);
  }

  @Post('add-to-reservation')
  public async addToReservation(@Body() body: UserToReservationDTO) {
    return await this.usersService.relationToReservation(body);
  }

  @Put('edit/:userId')
  public async updateUser(
    @Param('userId') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @Delete('delete/:userId')
  public async deleteUser(@Param('userId') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
