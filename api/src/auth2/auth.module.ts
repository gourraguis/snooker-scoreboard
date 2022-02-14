// import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { JwtModule } from '@nestjs/jwt'
// import { JwtStrategy } from './jwt.strategy'
// import { PassportModule } from '@nestjs/passport'
// import { Owner } from 'src/owner/entities/owner.entity'
// import { AuthService } from './auth.service'
// import { AuthController } from './auth.controller'
// import { OwnerModule } from 'src/owner/owner.module'

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Owner]),
//     PassportModule,
//     JwtModule.register({
//       secret: 'test',
//       signOptions: { expiresIn: '1d' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}
