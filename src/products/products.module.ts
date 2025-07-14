import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from './products.controller';
import { UploadController } from './upload.controller';
import { ProductsService } from './products.service';
import { DatabaseService } from '../shared/database.service';

@Module({
  imports: [ConfigModule],
  controllers: [ProductsController, UploadController],
  providers: [ProductsService, DatabaseService],
  exports: [ProductsService],
})
export class ProductsModule {} 