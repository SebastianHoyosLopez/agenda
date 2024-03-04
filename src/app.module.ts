import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSourceConfig } from './config/data.source';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { EarringsModule } from './earrings/earrings.module';
// import { DevtoolsModule } from '@nestjs/devtools-integration';
import { FinanceManagementModule } from './finance-management/finance-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    ReservationsModule,
    AuthModule,
    EarringsModule,
    FinanceManagementModule,
  ],
})
export class AppModule {}
