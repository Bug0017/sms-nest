import { AuthService } from './../auth.service';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.slice(7);
    const user = this.authService.decode(token) as any;
    const result = requiredRoles.some((role) => user?.role?.includes(role));
    return result;
  }
}
