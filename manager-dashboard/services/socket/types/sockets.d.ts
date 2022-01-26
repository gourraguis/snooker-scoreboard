import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'
import { IGame } from '../../../types/game'

export interface ServerToClientEvents {
  addBoard: (board: IBoard) => void
  updateGame: (game: IGame) => void
}

export interface ClientToServerEvents {
  initGame: (boardId: string, cb: (game: IGame) => void) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
