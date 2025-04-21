import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modules';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule],
})
export class AppModule {}
