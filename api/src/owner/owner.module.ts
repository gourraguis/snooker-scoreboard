import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticationMiddleware } from 'src/authentication.middleware'
import { Owner } from './entities/owner.entity'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.GET, path: '/owner/auth/checkAuth' }
      // { method: RequestMethod.PUT, path: '/owner' },
      // { method: RequestMethod.DELETE, path: '/owner/delete' }
    )
  }
}
