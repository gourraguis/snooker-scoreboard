import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { GameService } from './game.service'
import { IGameDB } from './types/game'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  saveGame(@Body() game: IGameDB): Promise<IGameDB> {
    return this.gameService.saveGame(game)
  }

  @Get('manager/:managerId')
  getManagerGames(@Param('managerId') managerId: string): Promise<IGameDB[]> {
    return this.gameService.getManagerGames(managerId)
  }

  @Get('board/:boardId')
  getBoardGames(@Param('boardId') boardId: string): Promise<IGameDB[]> {
    return this.gameService.getBoardGames(boardId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('weeklyGames')
  getWeeklyGames(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<number> {
    return this.gameService.getWeeklyGames(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('dailyGames')
  getDailyGames(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<number> {
    return this.gameService.getDailyGames(phoneNumber)
  }
}
