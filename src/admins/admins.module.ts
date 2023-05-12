import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminSchema } from 'src/typeorm/entities/AdminSchema';
import { AdminsController } from './controllers/admins.controller';
import { AdminsService } from './services/admins.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSchema])],
  controllers: [AdminsController],
  providers: [AdminsService, JwtService],
})
export class AdminsModule {}
