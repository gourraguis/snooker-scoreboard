import { Controller, Post, Body } from '@nestjs/common'
// import { Game } from './entities/game.entity'
import { GameService } from './game.service'
import { IGame } from './types/game'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  saveGame(@Body() game: IGame) {
    return this.gameService.saveGame(game)
  }
}
