import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { IBoard } from 'src/types/board'
import { BoardClientToServerEvents, BoardServer, BoardSocket } from '../types/board-sockets'
import { BoardEmitterGateway } from '../socket-emitters/board-emitter.gateway'
import { ManagerEmmiterGateway } from 'src/socket-emitters/manager-emitter.gateway'
import { BoardService } from 'src/board/board.service'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardListenerGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(BoardEmitterGateway.name)
  @WebSocketServer()
  server: BoardServer

  constructor(
    private readonly managerEmmiterGateway: ManagerEmmiterGateway,
    private readonly boardService: BoardService
  ) {}

  handleConnection(boardClient: BoardSocket) {
    this.logger.log(`Board connected: ${boardClient.id}`)
  }

  @SubscribeMessage<BoardClientToServerEvents>('initBoard')
  onInitBoard(@MessageBody() boardId: string): IBoard {
    const board = this.boardService.getBoard(boardId)
    return board
  }

  @SubscribeMessage<BoardClientToServerEvents>('updateBoard')
  onUpdateBoard(@MessageBody() board: IBoard) {
    this.managerEmmiterGateway.emitUpdateBoard(board)
  }
}
