import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { BoardClientToServerEvents, BoardServer, BoardSocket } from '../types/board-sockets'
import { BoardEmitterGateway } from '../socket-emitters/board-emitter.gateway'
import { ManagerEmmiterGateway } from '../socket-emitters/manager-emitter.gateway'
import { BoardService } from '../board/board.service'
import { IBoard } from '../board/types/board'
import { IGame } from '../game/types/game'
import { Socket } from 'socket.io'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardListenerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(BoardEmitterGateway.name)
  @WebSocketServer()
  server: BoardServer

  constructor(
    private readonly managerEmmiterGateway: ManagerEmmiterGateway,
    private readonly boardService: BoardService
  ) {}

  public handleDisconnect(boardClient: BoardSocket) {
    const board = this.boardService.findBoard(boardClient.data.boardId)
    this.managerEmmiterGateway.emitRemoveBoard(board)
    this.logger.log(`Board disconnected: ${boardClient.id}`)
  }

  public handleConnection(boardClient: BoardSocket) {
    this.logger.log(`Board connected: ${boardClient.id}`)
  }

  @SubscribeMessage<BoardClientToServerEvents>('initBoard')
  onInitBoard(@MessageBody() boardId: string, @ConnectedSocket() client: Socket): IBoard | void {
    console.log(boardId)

    if (!boardId) return
    client.data.boardId = boardId

    const board = this.boardService.findBoard(boardId)
    this.managerEmmiterGateway.emitAddBoard(board)
    return board
  }

  @SubscribeMessage<BoardClientToServerEvents>('updateGame')
  onUpdateGame(@MessageBody() game: IGame) {
    this.managerEmmiterGateway.emitUpdateGame(game)
  }
}
