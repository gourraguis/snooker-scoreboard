import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Board } from './entities/board.entity'
import { IBoard } from './types/board'

@Injectable()
export class BoardService {
  private logger: Logger = new Logger(BoardService.name)

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  public async getBoardWithSocketId(id: string, socketId: string) {
    const board = await this.boardRepository.findOne({
      id,
    })
    if (!board) {
      throw new NotFoundException('getBoardWithSocketId: There is no baord with this id')
    }
    const res = {
      id: board.id,
      name: board.name,
      owner: board.owner,
    }
    const newBoard = {
      id: board.id,
      name: board.name,
      owner: board.owner,
      socketId,
    }
    await this.boardRepository.save(newBoard)
    return res
  }

  public async getBoards(): Promise<IBoard[]> {
    const baords = await this.boardRepository.find()
    return baords
  }

  public async getBoard(id: string): Promise<IBoard> {
    const board = await this.boardRepository.findOne({
      id,
    })
    if (!board) {
      throw new NotFoundException('getBoard: There is no baord with this id')
    }
    return board
  }

  public async getOwnerBoards(phoneNumber: string): Promise<IBoard[]> {
    const boards = await this.boardRepository.find({ where: { owner: phoneNumber } })
    if (!boards) {
      throw new NotFoundException('There is no baords with this owner')
    }
    return boards
  }

  public async createBoard(board: IBoard, ownerId: string): Promise<Board> {
    const existingBaord = await this.boardRepository.findOne({
      id: board.id,
    })
    if (existingBaord) {
      throw new ConflictException('An board with this id already exists')
    }

    const newBoard = new Board()
    newBoard.id = board.id
    newBoard.name = board.name
    newBoard.owner = ownerId
    return this.boardRepository.save(newBoard)
  }

  public async updateBoard(board: IBoard): Promise<Board> {
    return await this.boardRepository.save(board)
  }
}
