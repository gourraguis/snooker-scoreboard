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

  findBoard(boardId: string): IBoard {
    this.logger.log(`Fetching board id: ${boardId} from db`)
    return {
      id: boardId,
      name: `Table ${boardId}`,
      owner: `0708303132`,
    }
  }

  async getAllBoards(): Promise<IBoard[]> {
    const baords = await this.boardRepository.find()
    return baords
  }

  async getBaord(id: string): Promise<IBoard> {
    const baord = await this.boardRepository.findOne({
      id: id,
    })
    if (!baord) {
      throw new NotFoundException('There is no baord with this id')
    }
    return {
      id: baord.id,
      name: baord.name,
      owner: baord.owner,
    }
  }

  async getBaordsWithTheSameOwner(owner: string): Promise<IBoard[]> {
    const baords = await this.boardRepository.find({ where: { owner: owner } })
    if (!baords) {
      throw new NotFoundException('There is no baords with this owner')
    }
    return baords
  }

  async createBoard(board: IBoard): Promise<Board> {
    this.logger.log(JSON.stringify(board, null, 2))
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

  async updateBoard(board: IBoard): Promise<Board> {
    return await this.boardRepository.save(board)
  }
}
