import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { BoardService } from './board.service'
import { Board } from './entities/board.entity'
import { IBoard } from './types/board'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAllBoards(): Promise<IBoard[]> {
    return this.boardService.getBoards()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getBoard(@Param('id') id: string) {
    return this.boardService.getBoard(id)
  }

  @Get('/byOwner/:owner')
  getOwnerBoards(@Param('owner') owner: string): Promise<IBoard[]> {
    return this.boardService.getOwnerBoards(owner)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBoard(@Body() board: IBoard): Promise<Board> {
    return this.boardService.createBoard(board)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateBoard(@Body() board: IBoard): Promise<Board> {
    return this.boardService.updateBoard(board)
  }
}
