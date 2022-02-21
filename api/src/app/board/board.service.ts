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

  public findBoard(boardId: string): IBoard {
    this.logger.log(`Fetching board id: ${boardId} from db`)
    return {
      id: boardId,
      name: `Table ${boardId}`,
      owner: `0708303132`,
    }
  }

  public async getBoards(): Promise<IBoard[]> {
    const baords = await this.boardRepository.find()
    return baords
  }

  public async getBoard(id: string): Promise<IBoard> {
    const board = await this.boardRepository.findOne({
      id: id,
    })
    if (!board) {
      throw new NotFoundException('There is no baord with this id')
    }
    return {
      id: board.id,
      name: board.name,
      owner: board.owner,
    }
  }

  public async getOwnerBoards(phoneNumber: string): Promise<IBoard[]> {
    const boards = await this.boardRepository.find({ where: { owner: phoneNumber } })
    if (!boards) {
      throw new NotFoundException('There is no baords with this owner')
    }
    return boards
  }

  public async createBoard(board: IBoard): Promise<Board> {
    const existingBaord = await this.boardRepository.findOne({
      id: board.id,
    })
    if (existingBaord) {
      throw new ConflictException('An board with this id already exists')
    }

    const newBoard = new Board()
    newBoard.id = board.id
    newBoard.name = board.name
    newBoard.owner = board.owner
    return this.boardRepository.save(newBoard)
  }

  public async updateBoard(board: IBoard): Promise<Board> {
    return await this.boardRepository.save(board)
  }
}
