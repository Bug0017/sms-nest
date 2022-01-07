import { SessionGuard } from './auth/session.guard';
import { LocalAuthGuard } from './auth/auth.guard';
import { Controller, Get, Post, UseGuards , Request, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import {PrismaService} from './prisma/prisma.service';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return {
      ...req.user,
      message: 'logged in',
    };
  }

  @UseGuards(SessionGuard)
  @Roles(Role.Admin)
  @Get('products')
  getPublishedProducts() {
    return this.prisma.product.findMany({
      where: {
        published: true,
      },
    });
  }

  @UseGuards(SessionGuard)
  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
