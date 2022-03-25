import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Owner } from './entities/owner.entity'
import { IOwner } from './types/IOwner'
import { IGame } from '../game/types/game'

@Injectable()
export class OwnerService {
  private defaultBalance = 300

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>
  ) {}

  public async getOwner(phoneNumber: string): Promise<IOwner> {
    const owner = await this.ownerRepository.findOne({
      phoneNumber,
    })
    if (!owner) {
      throw new BadRequestException(`Votre numéro de téléphone ou votre code d'authentification est invalide`)
    }

    return {
      phoneNumber: owner.phoneNumber,
      name: owner.name,
      balance: owner.balance,
    }
  }

  public async createOwner(owner: Partial<Owner>): Promise<IOwner> {
    const existingOwner = await this.ownerRepository.findOne({
      phoneNumber: owner.phoneNumber,
    })
    if (existingOwner) {
      throw new ConflictException('An owner with this phone number already exists')
    }

    const newOwner = new Owner()
    newOwner.phoneNumber = owner.phoneNumber
    newOwner.name = owner.name
    newOwner.balance = this.defaultBalance
    await this.ownerRepository.save(newOwner)

    return {
      phoneNumber: owner.phoneNumber,
      name: owner.name,
      balance: owner.balance,
    }
  }

  public async checkPhoneNumber(phoneNumber: string): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      phoneNumber: phoneNumber,
    })
    if (!owner) {
      throw new NotFoundException('There is no owner with this phone number')
    }
    return owner
  }

  public async getStatisticsByFilter(phoneNumber: string, filter): Promise<IGame> {
    let games: IGame
    if (filter.managerId && filter.tableId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.manager_id = '${filter.managerId}'
       And game.board_id = '${filter.tableId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    }

    return games
  }
}
