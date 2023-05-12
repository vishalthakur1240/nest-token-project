import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSchema } from './typeorm/entities/StudentSchema';
import { StudentsModule } from './students/students.module';
import { AdminSchema } from './typeorm/entities/AdminSchema';

import { AdminsModule } from './admins/admins.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567890',
      database: 'vishaltestdb',
      entities: [StudentSchema, AdminSchema],
      synchronize: false,
    }),
    StudentsModule,
    AdminsModule,
    // JwtModule.register({
    //   // global: true,
    //   secret: 'vishalSecret',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
