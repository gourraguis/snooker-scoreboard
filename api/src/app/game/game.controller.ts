import { Controller, Post, Body, UseGuards, UnauthorizedException, Put, Get } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Game } from './entities/game.entity'
import { GameService } from './game.service'
import { IStatsFilter } from './types/stats-filter'
import { IGame } from './types/game'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post('stats')
  getStatus(
    @AuthenticatedUser('id') id: string,
    @AuthenticatedUser('ownerId') ownerId: string,
    @Body() filter: IStatsFilter
  ) {
    // inexistence of an owner id means that the authenticated user is an owner
    if (ownerId) {
      return this.gameService.getManagerStats(id, filter)
    }
    return this.gameService.getOwnerStats(id, filter)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  saveGame(
    @AuthenticatedUser('id') id: string,
    @AuthenticatedUser('ownerId') ownerId: string,
    @Body() game: Game
  ): Promise<Game> {
    if (!ownerId) {
      // inexistence of an owner id means that the authenticated user is an owner
      throw new UnauthorizedException('Only managers can save a game')
    }
    return this.gameService.saveGame(id, ownerId, game)
  }

  @UseGuards(JwtAuthGuard)
  @Get('state')
  getGamesState(@AuthenticatedUser('ownerId') ownerId: string) {
    return this.gameService.getGamesState(ownerId)
  }

  @Post('state')
  saveGameState(@Body() game: IGame) {
    return this.gameService.saveGameState(game)
  }
}
