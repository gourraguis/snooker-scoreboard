// import { Injectable, NotFoundException } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { InjectRepository } from '@nestjs/typeorm'
// import { Owner } from 'src/owner/entities/owner.entity'
// import { decodeOtp } from 'src/owner/utils'
// import { Repository } from 'typeorm'

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(Owner)
//     private readonly ownerRepository: Repository<Owner>,
//     private jwtService: JwtService
//   ) {}

//   async checkOtp(otp: number) {
//     const decodedOtp = decodeOtp(otp)
//     const owner = await this.ownerRepository.findOne({
//       otp: decodedOtp,
//     })
//     if (!owner) {
//       throw new NotFoundException('Otp in invalid !')
//     }

//     const access_token = await this.jwtService.signAsync({ phone: owner.phoneNumber })
//     console.log(access_token)

//     const data = {
//       accToken: access_token,
//       phoneNumber: owner.phoneNumber,
//       name: owner.name,
//     }
//     console.log(this.jwtService.decode(access_token))
//     return data
//   }
// }
