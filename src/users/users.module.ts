import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database.service';

@Module({
  controllers: [],
  providers: [DatabaseService],
  exports: [],
})
export class UsersModule {} 