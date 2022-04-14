import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { GameService } from '../game/game.service'
import { BoardEmitterGateway } from '../socket-emitters/board-emitter.gateway'
import { ManagerClientToServerEvents, ManagerServer, ManagerSocket } from '../types/manager-sockets'
import { IInitBoard } from '../types/initBoard'
import { ManagerService } from '../manager/manager.service'
import { BoardService } from '../board/board.service'
import { Board } from '../board/entities/board.entity'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerListenerGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(ManagerListenerGateway.name)
  @WebSocketServer()
  server: ManagerServer

  constructor(
    private readonly boardEmitterGateway: BoardEmitterGateway,
    private readonly gameService: GameService,
    private readonly managerService: ManagerService,
    private readonly boardService: BoardService
  ) {}

  public handleConnection(ManagerClient: ManagerSocket) {
    this.logger.log(`Manager connected: ${ManagerClient.id}`)
  }

  @SubscribeMessage<ManagerClientToServerEvents>('getBoardsData')
  async onInitBoard(@MessageBody() managerId: string): Promise<void | Board[]> {
    if (!managerId) return
    const manager = await this.managerService.getManager(managerId)
    const boards = await this.boardService.getOwnerBoards(manager.ownerId)
    this.boardEmitterGateway.emitGetBoardsData(boards)
  }

  @SubscribeMessage<ManagerClientToServerEvents>('initGame')
  onNewGame(@MessageBody() board: IInitBoard) {
    // const managerId = client.data.managerId
    const managerId = '1'
    if (!managerId) {
      //todo: redirect to login in case of error
      return
    }
    this.logger.log(`Starting new game on board id: ${board.boardId}`)
    const newGame = this.gameService.createGame(board)
    this.boardEmitterGateway.emitStartNewGame(newGame)
    return newGame
  }

  @SubscribeMessage<ManagerClientToServerEvents>('updatePlayerName')
  onUpdatePlayerName(@MessageBody() board: IInitBoard) {
    const managerId = '1'
    if (!managerId) {
      return
    }
    this.logger.log(`Starting new game on board id: ${board.boardId}`)
    const newGame = this.gameService.createGame(board)
    this.boardEmitterGateway.emitUpdatePlayerName(board)
    return newGame
  }

  @SubscribeMessage<ManagerClientToServerEvents>('stopTimer')
  onStopTimer(@MessageBody() board: IInitBoard) {
    const managerId = '1'
    if (!managerId) {
      return
    }
    this.logger.log(`Stop Timer on board id: ${board.boardId}`)
    const newGame = this.gameService.createGame(board)
    this.boardEmitterGateway.emitStopTimer(board)
    return newGame
  }
}
