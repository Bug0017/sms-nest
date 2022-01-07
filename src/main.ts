import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as  session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: 'surendar secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
