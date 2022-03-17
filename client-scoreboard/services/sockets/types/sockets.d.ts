import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'
import { IGame } from '../../../types/game'

export interface ServerToClientEvents {
  initGame: (newGame: IGame) => void
  updatePlayerName: (newNames: IGame) => void
  getBoardsData: (game: IGame) => void
  stopTimer: () => void
}

export interface ClientToServerEvents {
  initBoard: (boardId: string, cb: (board: IBoard) => void) => void
  updateGame: (game: IGame) => void
}

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
