import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseService } from './shared/database.service';
import { AuthModule } from './auth/auth.module';

// Modulos importados para o app, controllers e providers desses modules são adicionados automaticamente
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    ProductsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
