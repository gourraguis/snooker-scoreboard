import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'

export interface ServerToClientEvents {
  newGame: () => void
}

export interface ClientToServerEvents {
  initBoard: (boardId: string, cb: (board: IBoard) => void) => void
  updateBoard: (board: IBoard) => void
}

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
