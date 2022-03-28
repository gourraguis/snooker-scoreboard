import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Repository } from 'typeorm'
import { Owner } from './entities/owner.entity'
import { IOwner } from './types/IOwner'

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

  public async getStatisticsByFilter(phoneNumber: string, filter) {
    let games = []
    if (filter.managerId && filter.tableId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.manager_id = '${filter.managerId}'
       And game.board_id = '${filter.tableId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (!filter.managerId && filter.tableId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.board_id = '${filter.tableId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (filter.managerId && !filter.tableId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}'
       And game.manager_id = '${filter.managerId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (!filter.managerId && !filter.tableId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    }
    let data = []
    for (let index = 0; index < games.length; index++) {
      const table = await this.ownerRepository.query(`SELECT * FROM board WHERE board.id = '${games[index].board_id}'`)
      const manager = await this.ownerRepository.query(
        `SELECT * FROM manager WHERE manager.id = '${games[index].manager_id}'`
      )

      data = [
        ...data,
        {
          manager: manager[0]?.name,
          table: table[0]?.name,
          startedAt: games[index].started_at,
          finishedAt: games[index].finished_at,
          winner: games[index].winner,
          loser: games[index].loser,
          duration: moment(moment(games[index].finished_at).diff(moment(games[index].started_at))).format('mm:ss'),
        },
      ]
    }
    return data
  }
}
