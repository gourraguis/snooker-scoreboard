import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'

export interface ServerToClientEvents {
  boardsList: (boards: IBoard[]) => void
  updateBoard: (board: IBoard) => void
}

export interface ClientToServerEvents {
  newGame: (req: { boardId: string }, cb: (res: { error: string }) => void) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
