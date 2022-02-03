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

let ID: string
@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardListenerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(BoardEmitterGateway.name)
  @WebSocketServer()
  server: BoardServer

  constructor(
    private readonly managerEmmiterGateway: ManagerEmmiterGateway,
    private readonly boardService: BoardService
  ) {}

  handleDisconnect(boardClient: BoardSocket) {
    const board = this.boardService.findBoard(ID)
    this.managerEmmiterGateway.emitRemoveBoard(board)
    this.logger.log(`Board disconnected: ${boardClient.id}`)
  }

  handleConnection(boardClient: BoardSocket) {
    this.logger.log(`Board connected: ${boardClient.id}`)
  }

  @SubscribeMessage<BoardClientToServerEvents>('initBoard')
  onInitBoard(@MessageBody() boardId: string, @ConnectedSocket() client: Socket): IBoard {
    client.data.boardId = boardId
    console.log(client.data)
    console.log(this.server.sockets)

    ID = boardId

    const board = this.boardService.findBoard(boardId)
    this.managerEmmiterGateway.emitAddBoard(board)
    return board
  }

  @SubscribeMessage<BoardClientToServerEvents>('updateGame')
  onUpdateGame(@MessageBody() game: IGame) {
    this.managerEmmiterGateway.emitUpdateGame(game)
  }
}
