import { IBoard } from './Board'

export interface ServerToClientEvents {
  fetchBoardsList: (boards: IBoard[]) => void
  startNewGame: (isSuccesfull: boolean) => void
}

export interface ClientToServerEvents {
  fetchBoardsList: () => IBoard
  startNewGame: () => boolean
}

export interface SocketData {
  managerId: string
}
