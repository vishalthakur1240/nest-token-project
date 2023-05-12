import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    // console.log('authHeader------------------');
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, 'vishal-secret-key');
      // console.log('DECODED-----------------------');
      // console.log(decodedToken);
      req.user = decodedToken;
      // next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
