import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Board } from './entities/board.entity'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  public async getBoardWithSocketId(id: string, socketId: string) {
    const board = await this.boardRepository.findOne({
      id,
    })
    if (!board) {
      throw new NotFoundException('getBoardWithSocketId: There is no board with this id')
    }
    board.socketId = socketId
    await this.boardRepository.save(board)
    return board
  }

  public async getBoard(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      id,
    })
    if (!board) {
      throw new NotFoundException('getBoard: There is no baord with this id')
    }
    return board
  }

  public async getOwnerBoards(phoneNumber: string): Promise<Board[]> {
    const boards = await this.boardRepository.find({ where: { owner: phoneNumber } })
    if (!boards) {
      throw new NotFoundException('There is no baords with this owner')
    }
    return boards
  }

  public async createBoard(board: Board, ownerId: string): Promise<Board> {
    const existingBaord = await this.boardRepository.findOne({
      id: board.id,
    })
    if (existingBaord) {
      throw new ConflictException('An board with this id already exists')
    }

    const newBoard = new Board()
    newBoard.id = board.id
    newBoard.name = board.name
    newBoard.ownerId = ownerId
    return this.boardRepository.save(newBoard)
  }

  public async updateBoard(board: Board): Promise<Board> {
    return await this.boardRepository.save(board)
  }

  public async deleteBoard(id: string) {
    return await this.boardRepository.delete({ id })
  }
}
