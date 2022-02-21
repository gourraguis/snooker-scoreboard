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

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerListenerGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(ManagerListenerGateway.name)
  @WebSocketServer()
  server: ManagerServer

  constructor(private readonly boardEmitterGateway: BoardEmitterGateway, private readonly gameService: GameService) {}

  public handleConnection(ManagerClient: ManagerSocket) {
    this.logger.log(`NODE_ENV=${process.env.NODE_ENV}`)
    this.logger.log(`Manager connected: ${ManagerClient.id}`)
  }

  @SubscribeMessage<ManagerClientToServerEvents>('initGame')
  onNewGame(@MessageBody() board: IInitBoard) {
    // const managerId = client.data.managerId
    const managerId = '1'
    if (!managerId) {
      //todo: redirect to login in case of error
      return
    }
    //todo: use board id to start game on the right board
    this.logger.log(`Starting new game on board id: ${board.boardId}`)
    const newGame = this.gameService.createGame(board)
    this.boardEmitterGateway.emitStartNewGame(newGame)
    return newGame
  }
}
