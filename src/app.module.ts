import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { ScheduleModule } from '@nestjs/schedule';
import dataSource from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot(dataSource.options),
  ],
})
export class AppModule {}
