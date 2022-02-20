import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Owner } from './entities/owner.entity'
import { IOwner } from './types/IOwner'
import { encodeOtp, generateNewOtp } from './utils'

@Injectable()
export class OwnerService {
  private defaultBalance = 300
  private logger: Logger = new Logger(OwnerService.name)

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>
  ) {}

  public async getOwner(phoneNumber: string): Promise<IOwner> {
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

  public async getOwners(): Promise<IOwner[]> {
    const owner = await this.ownerRepository.find()
    return owner
  }

  public async findOwnerByCondition(condition) {
    //todo: remove this method and replace it
    return this.ownerRepository.findOne(condition)
  }

  public async createOwner(owner: IOwner): Promise<Owner> {
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

  public async generateOtp(phoneNumber: string): Promise<{ otp: string }> {
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

  public async sendSms(otp: string) {
    console.log('Send SMS:', otp)
  }
}