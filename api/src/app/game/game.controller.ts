import { Controller, Post, Body, Get, UseGuards, UnauthorizedException } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Game } from './entities/game.entity'
import { GameService } from './game.service'
import { IStatsFilter } from './types/stats-filter'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get('weeklyGames')
  getWeeklyGames(@AuthenticatedUser('id') id: string): Promise<number> {
    return this.gameService.getWeeklyGames(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('dailyGames')
  getDailyGames(@AuthenticatedUser('id') id: string): Promise<number> {
    return this.gameService.getDailyGames(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('stats')
  getStatus(
    @AuthenticatedUser('id') id: string,
    @AuthenticatedUser('type') type: 'owner' | 'manager',
    @Body() filter: IStatsFilter
  ) {
    if (type === 'owner') {
      return this.gameService.getOwnerStats(id, filter)
    }
    if (type === 'manager') {
      return this.gameService.getManagerStats(id, filter)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  saveGame(
    @AuthenticatedUser('id') id: string,
    @AuthenticatedUser('type') type: string,
    @Body() game: Game
  ): Promise<Game> {
    if (type !== 'manager') {
      throw new UnauthorizedException('Only managers can save a game')
    }
    return this.gameService.saveGame(id, game)
  }
}
