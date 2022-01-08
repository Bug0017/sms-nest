import { JwtAuthGuard } from './auth/jwt.guard';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/auth.guard';
import { Controller, Get, Post, UseGuards , Request, Res} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import {PrismaService} from './prisma/prisma.service';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/role.enum';
@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('products')
  getPublishedProducts() {
    return this.prisma.product.findMany({
      where: {
        published: true,
      },
    });
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
