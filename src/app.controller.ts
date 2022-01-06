import { SessionGuard } from './auth/session.guard';
import { LocalAuthGuard } from './auth/auth.guard';
import { Controller, Get, Post, UseGuards , Request} from '@nestjs/common';
import { AppService } from './app.service';
import {PrismaService} from './prisma/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req){
    return req.user
  }

  @UseGuards(SessionGuard)
  @Get('products')
  getPublishedProducts(){
    return this.prisma.product.findMany({where:{
      published:true
    }})
  }
}
