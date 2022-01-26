import { Controller, Post, Body } from '@nestjs/common'
import { BoardService } from './board.service'
import { IBoard } from './types/board'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('')
  createBoard(@Body() name: IBoard): Promise<void> {
    return this.boardService.create(name)
  }
}
