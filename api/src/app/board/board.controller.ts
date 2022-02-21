import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
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

  @Get('all')
  getOwnerBoards(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<IBoard[]> {
    return this.boardService.getOwnerBoards(phoneNumber)
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
