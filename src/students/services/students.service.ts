import { BadRequestException, Injectable, Req } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { AdminSchema } from 'src/typeorm/entities/AdminSchema';
import { StudentSchema } from 'src/typeorm/entities/StudentSchema';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentSchema)
    private studentRepository: Repository<StudentSchema>,

    @InjectRepository(AdminSchema) // inject the AdminSchema repository
    private adminRepository: Repository<AdminSchema>,
  ) {}

  async createStudent(studentDetails, req) {
    // console.log(studentDetails);

    /*
    {
      studentName: 'vishal1',
      studentMail: 'vishal1@mail.com',
      studentClass: 'four'
    }
    */

    console.log('---------------- Decoded TOKEN --------------');
    console.log(req.user); // { adminMail: 'admin11@mail.com', iat: 1683529158, exp: 1683532758 }

    let adminMail = req.user.adminMail;
    const isAdmin = await this.adminRepository.findOne({
      where: { adminMail },
    });

    if (!isAdmin) {
      console.log('Admin does not exists');
      return new BadRequestException('Admin does not exists');
    }

    const { studentName, studentMail, studentClass } = studentDetails; // use destructuring to get studentName property
    console.log(studentName);
    const newUser = this.studentRepository.create({
      studentName: studentName.toUpperCase(),
      studentMail,
      studentClass,
      createdAt: new Date(),
    });
    return this.studentRepository.save(newUser);
  }

  async getStudent() {
    return this.studentRepository.find();
    // return this.studentRepository
    //   .createQueryBuilder('student')
    //   .select([
    //     'student.studentName',
    //     'student.studentMail',
    //     'student.createdAt',
    //   ])
    //   .getMany();
  }
}
