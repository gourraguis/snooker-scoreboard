import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { JwtService } from '@nestjs/jwt'
dotenv.config()

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
      throw new HttpException('Invalid Token', 401)
    }
    await this.jwtService
      .verifyAsync(req.headers.authorization.split(' ')[1])
      .then((data) => console.log('Res => ', data))
      .catch(() => {
        throw new HttpException('Invalid Token', 401)
      })
    next()
  }
}
