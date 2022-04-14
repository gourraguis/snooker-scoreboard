import { Controller, Post, Body, Get, Param, Put, UseGuards, Delete } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { BoardService } from './board.service'
import { Board } from './entities/board.entity'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getBoard(@Param('id') id: string) {
    return this.boardService.getBoard(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('all/:phoneNumber')
  getOwnerBoards(@Param('phoneNumber') phoneNumber: string): Promise<Board[]> {
    return this.boardService.getOwnerBoards(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBoard(@AuthenticatedUser('id') ownerId: string, @Body() board: Board): Promise<Board> {
    return this.boardService.createBoard(board, ownerId)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateBoard(@Body() board: Board): Promise<Board> {
    return this.boardService.updateBoard(board)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteManager(@Param('id') id: string) {
    return this.boardService.deleteBoard(id)
  }
}
