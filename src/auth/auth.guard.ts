import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;

        console.log(result)
        const request = context.switchToHttp().getRequest();

        await super.logIn(request)

        return result;
    }
}