import { Controller, Post, Body, Get, Param } from '@nestjs/common'
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
}
