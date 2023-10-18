import { Global, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersReservationsEntity } from './entities/usersReservations.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersReservationsEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
