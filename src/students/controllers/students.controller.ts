import {
  Body,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Req,
} from '@nestjs/common';

import { Controller } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dtos/CreateStudents.dto';
import { CreateAdminDto } from '../../admins/dtos/CreateAdmins.dto';
import { AdminsService } from '../../admins/services/admins.service';

import { Request } from 'express';

@Controller()
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Post('student')
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Req() req: Request,
  ) {
    // console.log(req.user); // prints the decoded token
    return this.studentService.createStudent(createStudentDto, req);
  }

  @Get('student')
  getStudent() {
    return this.studentService.getStudent();
  }
}
