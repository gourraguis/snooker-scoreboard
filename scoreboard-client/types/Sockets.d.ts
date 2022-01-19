import { Socket } from 'socket.io-client'
import { IBoard } from './Board'

export interface ServerToClientEvents {
  newGame: () => void
}

export interface ClientToServerEvents {
  updateGame: (board: IBoard) => void
}

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
