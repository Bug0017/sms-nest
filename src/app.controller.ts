import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {PrismaService} from './prisma/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Get('products')
  getPublishedProducts(){
    return this.prisma.product.findMany({where:{
      published:true
    }})
  }
}