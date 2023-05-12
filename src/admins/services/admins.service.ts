import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AdminSchema } from 'src/typeorm/entities/AdminSchema';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminSchema)
    private adminRepository: Repository<AdminSchema>, // private jwtService: JwtService,
  ) {}

  async createAdmin(adminDetails) {
    console.log(adminDetails);
    /*
    {
      adminName: 'admin1',
      adminMail: 'admin1@mail.com',
      adminPassword: 'admin123'
    }
    */

    const { adminName, adminMail, adminPassword } = adminDetails; // use destructuring to get studentName property
    console.log(adminName);

    // HashPassword
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const newAdmin = this.adminRepository.create({
      adminName: adminName.toUpperCase(),
      adminMail,
      adminPassword: hashedPassword,
      createdAt: new Date(),
    });
    this.adminRepository.save(newAdmin);

    return {
      success: true,
      message: 'Admin SingUP Successfull',
      data: newAdmin,
    };
  }

  async adminLogin(adminDetails) {
    try {
      const { adminMail, adminPassword } = adminDetails; // use destructuring to get studentName property
      console.log(adminDetails);

      const isAdmin = await this.adminRepository.findOne({
        where: { adminMail },
      });

      if (!isAdmin) {
        console.log('Admin does not exists');
        return new BadRequestException('Admin does not exists');
      }
      // if (!isAdmin) {
      //   return new HttpException(
      //     { message: 'Admin does not exist' },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }

      const isPasswordValid = await bcrypt.compare(
        adminPassword, // password given in the body
        isAdmin.adminPassword, // password saved in the DB
      );

      if (!isPasswordValid) {
        return new BadRequestException('Invalid Password');
      }

      console.log('-=-');
      const jwtToken = jwt.sign({ adminMail: adminMail }, 'vishal-secret-key', {
        expiresIn: '1h',
      });

      // const payload = { adminMail: adminMail };
      // console.log('-=-');
      // console.log(payload);
      // const jwtToken = await this.jwtService.signAsync(payload);
      // console.log(jwtToken);
      // // const access_token: await this.jwtService.signAsync(payload),
      console.log('---------');
      return {
        success: true,
        message: 'Login Successfull',
        access_token: jwtToken,
      };
    } catch (error) {
      throw new BadRequestException('Could not log in');
    }
  }
}
