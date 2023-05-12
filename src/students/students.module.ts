import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { StudentSchema } from 'src/typeorm/entities/StudentSchema';
import { TokenMiddleware } from 'src/middlewares/tokenMiddleware';
import { AdminSchema } from 'src/typeorm/entities/AdminSchema';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSchema, AdminSchema])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '/student', method: RequestMethod.POST });
  }
}
