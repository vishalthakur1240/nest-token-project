import {
  Body,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Controller } from '@nestjs/common';
import { CreateAdminDto } from '../dtos/CreateAdmins.dto';
import { AdminsService } from '../services/admins.service';
// import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  // SIGN_UP
  @Post('admin/signup')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  // LOGIN (Token Generated)
  @Post('admin/login')
  adminLogin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.adminLogin(createAdminDto);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Body() createAdminDto: CreateAdminDto) {
  //   return this.authService.login(createAdminDto);
  // }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
