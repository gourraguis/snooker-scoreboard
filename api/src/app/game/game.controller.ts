import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { GameService } from './game.service'
import { ICardElements } from './types/cardElement'
import { IGameDB } from './types/game'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  saveGame(@Body() game: IGameDB): Promise<IGameDB> {
    return this.gameService.saveGame(game)
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

  @UseGuards(JwtAuthGuard)
  @Get('managersGames')
  getManagersGames(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<ICardElements[]> {
    return this.gameService.getManagersGames(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('boardsGames')
  getBoardsGames(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<ICardElements[]> {
    return this.gameService.getBoardsGames(phoneNumber)
  }
}
