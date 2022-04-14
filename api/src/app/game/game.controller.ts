import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Game } from './entities/game.entity'
import { GameService } from './game.service'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  saveGame(@Body() game: Game): Promise<Game> {
    return this.gameService.saveGame(game)
  }

  @UseGuards(JwtAuthGuard)
  @Get('weeklyGames')
  getWeeklyGames(@AuthenticatedUser('id') phoneNumber: string): Promise<number> {
    return this.gameService.getWeeklyGames(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('dailyGames')
  getDailyGames(@AuthenticatedUser('id') phoneNumber: string): Promise<number> {
    return this.gameService.getDailyGames(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('managerDailyGames')
  getManagerDailyGames(@AuthenticatedUser('id') phoneNumber: string) {
    return this.gameService.getManagerGames(phoneNumber)
  }
}
