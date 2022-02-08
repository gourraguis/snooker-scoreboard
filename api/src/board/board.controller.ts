import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { BoardService } from './board.service'
import { Board } from './entities/board.entity'
import { IBoard } from './types/board'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoards(): Promise<IBoard[]> {
    return this.boardService.getAllBoards()
  }

  @Get(':id')
  getBaord(@Param('id') id: string) {
    return this.boardService.getBaord(id)
  }

  @Get('/byOwner/:owner')
  getBaordsWithTheSameOwner(@Param('owner') owner: string): Promise<IBoard[]> {
    return this.boardService.getBaordsWithTheSameOwner(owner)
  }

  @Post()
  createBoard(@Body() board: IBoard): Promise<Board> {
    return this.boardService.createBoard(board)
  }
}
