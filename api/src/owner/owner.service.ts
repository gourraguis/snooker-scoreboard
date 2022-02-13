import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Owner } from './entities/owner.entity'
import { IOwner } from './types/IOwner'
import { decodeOtp, encodeOtp, generateNewOtp } from './utils'
// import * as jwt from 'express-jwt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class OwnerService {
  private defaultBalance = 300
  private logger: Logger = new Logger(OwnerService.name)

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    private jwtService: JwtService
  ) {}

  async getOwner(phoneNumber: string): Promise<IOwner> {
    const owner = await this.ownerRepository.findOne({
      phoneNumber: phoneNumber,
    })
    if (!owner) {
      throw new NotFoundException('There is no owner with this phone number !!')
    }
    return {
      phoneNumber: owner.phoneNumber,
      name: owner.name,
      balance: owner.balance,
    }
  }

  async getAllOwners(): Promise<IOwner[]> {
    const owner = await this.ownerRepository.find()
    return owner
  }

  async createOwner(owner: IOwner): Promise<Owner> {
    const existingOwner = await this.ownerRepository.findOne({
      phoneNumber: owner.phoneNumber,
    })
    if (existingOwner) {
      throw new ConflictException('An owner with this phone number already exists')
    }

    const newOnwer = new Owner()
    newOnwer.phoneNumber = owner.phoneNumber
    newOnwer.name = owner.name
    newOnwer.balance = this.defaultBalance
    return this.ownerRepository.save(newOnwer)
  }

  async generateOtp(phoneNumber: string): Promise<{ otp: string }> {
    const owner = await this.ownerRepository.findOne({
      phoneNumber: phoneNumber,
    })
    if (!owner) {
      throw new NotFoundException('There is no owner with this phone number')
    }
    const generatedOtp = generateNewOtp()
    owner.otp = generatedOtp
    await this.ownerRepository.save(owner)

    this.sendSms(encodeOtp(generatedOtp))
    return {
      otp: encodeOtp(generatedOtp),
    }
  }

  async checkOtp(otp: number) {
    const decodedOtp = decodeOtp(otp)
    const owner = await this.ownerRepository.findOne({
      otp: decodedOtp,
    })
    if (!owner) {
      throw new NotFoundException('Otp in invalid !')
    }
    const token = await this.jwtService.signAsync({ phone: owner.phoneNumber })
    const data = {
      accToken: token,
      phoneNumber: owner.phoneNumber,
      name: owner.name,
    }
    return data
  }

  async checkAuth() {
    console.log('ok')
  }

  async sendSms(otp: string) {
    console.log('send sms:', otp)
  }
}
