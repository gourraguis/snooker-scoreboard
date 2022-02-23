import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'
import { IGame } from '../../../types/game'

export interface ServerToClientEvents {
  initGame: (newGame: IGame) => void
}

export interface ClientToServerEvents {
  initBoard: (boardId: string | string[] | undefined, cb: (board: IBoard) => void) => void
  updateGame: (game: IGame) => void
}

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
