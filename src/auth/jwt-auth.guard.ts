import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

export class Jwtguard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Authorization header missing' });
      }
      
      const [bearer, token] = authHeader.split(' ');
      
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Invalid token' });
      }
      if(this.jwtService){
        const user = this.jwtService.verify(token);
        req.user = user;

      }

      return true;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}